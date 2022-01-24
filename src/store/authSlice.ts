import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: localStorage.getItem('jwt')
  },
  reducers: {
    editAuth(state, action) {
      state.auth = action.payload;
    }
  }
});

export const { editAuth } = authSlice.actions;
export default authSlice.reducer;