import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mestoApi } from "../components/utils/api";
import { editAuth } from "./authSlice";
import type { LoginType } from "../types/types";

export const fethcLogin = createAsyncThunk(
  'login/fethcLogin',
  function (data: LoginType, { rejectWithValue, dispatch }) {
    return mestoApi.authorize(data.login, data.password).then((res) => {
      if (res.jwt) {
        localStorage.setItem('jwt', res.jwt);
        dispatch(editAuth(res.jwt));
        return res.jwt;
      }
      if (res.status === 400) return Promise.reject('Неверный логин или пароль');
      return Promise.reject('Что-то пошло не так');
    }).catch((err) => rejectWithValue(err));
  }
);

const loginSlice = createSlice({
  name: 'login',
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
    builder.addCase(fethcLogin.pending, (state) => {
      state.button = false;
      state.error = '';
    });
    builder.addCase(fethcLogin.fulfilled, (state) => {
      state.error = '';
      state.button = true;
    });
    builder.addCase(fethcLogin.rejected, (state, action) => {
      state.error += action.payload;
      state.button = true;
    });
  }

});
export const { editError } = loginSlice.actions;
export default loginSlice.reducer;