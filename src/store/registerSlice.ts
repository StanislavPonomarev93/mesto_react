import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mestoApi } from "../components/utils/api";
import type { RegisterType } from "../types/types";

export const fethcRegister = createAsyncThunk(
  'register/fethcRegister',
  function (data: RegisterType, { rejectWithValue }) {
    return mestoApi.register(data.login, data.password, data.email).then((res) => {
      if (res.jwt) return res;
      if (res.status === 400) return Promise.reject('email уже занят');
      return Promise.reject('Что-то пошло не так');
    }).catch((err) => rejectWithValue(err))
  }
)

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    error: '',
    button: true
  },
  reducers: {
    editError(state, action) {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fethcRegister.pending, (state) => {
      state.button = false;
      state.error = '';
    });
    builder.addCase(fethcRegister.fulfilled, (state) => {
      state.error = '';
      state.button = true;
    });
    builder.addCase(fethcRegister.rejected, (state, action) => {
      state.error += action.payload;
      state.button = true;
    });
  }
});
export const { editError } = registerSlice.actions;
export default registerSlice.reducer;
