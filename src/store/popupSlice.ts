import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    popupUser: false,
    popupAvatar: false,
    popupCard: false,
    popupImage: false
  },
  reducers: {
    isPopupUser(state, action) {
      state.popupUser = action.payload;
    },
    isPopupAvatar(state, action) {
      state.popupAvatar = action.payload;
    },
    isPopupAddCard(state, action) {
      state.popupCard = action.payload;
    },
    isPopupBigImage(state, action) {
      state.popupImage = action.payload;
    }
  }
});

export const { isPopupUser, isPopupAvatar, isPopupAddCard, isPopupBigImage } = popupSlice.actions;
export default popupSlice.reducer;