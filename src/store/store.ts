import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./userDataSlice";
import popupSlice from "./popupSlice";
import cardsSlice from "./cardsSlice";
import authSlice from "./authSlice";
import loginSlice from "./loginSlice";
import registerSlice from "./registerSlice";

export const store = configureStore({
  reducer: {
    userData: userDataSlice,
    popup: popupSlice,
    cards: cardsSlice,
    auth: authSlice,
    login: loginSlice,
    register: registerSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;