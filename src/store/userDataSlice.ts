import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mestoApi } from "../components/utils/api";
import type { UserType } from "../types/types";

export const fethcUserData = createAsyncThunk(
  'userData/fethcUserData',
  function () {
    return mestoApi.getUserInfo().then(res => res);
  }
);

export const fethcEditUserAvatar = createAsyncThunk(
  'userData/fethcEditUserAvatar',
  function (data: UserType) {
    return mestoApi.changeAvatar(data.avatar).then(res => res);
  }
);

export const fethcEditUser = createAsyncThunk(
  'userData/fethcEditUser',
  function (data: UserType) {
    return mestoApi.sendUserInfo(data.name, data.about).then(res => res);
  }
);

const userSlice = createSlice({
  name: 'userData',
  initialState: {
    userData: {
      name: '',
      about: '',
      avatar: '',
      _id: ''
    },
    button: true
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fethcUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
    builder.addCase(fethcEditUser.pending, (state) => {
      state.button = false;
    });
    builder.addCase(fethcEditUser.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.button = true;
    });
    builder.addCase(fethcEditUserAvatar.pending, (state) => {
      state.button = false;
    });
    builder.addCase(fethcEditUserAvatar.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.button = true;
    });
  }
});

export default userSlice.reducer;