import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mestoApi } from "../components/utils/api";
import type { CardType } from '../types/types';

export const fethcCardsData = createAsyncThunk(
  'cards/fethcCardsData',
  function () {
    return mestoApi.getInitialCards().then(res => res);
  }
);

export const fethcDeleteCard = createAsyncThunk(
  'cards/fethcDeleteCard',
  function (element: CardType) {
    return mestoApi.deleteCard(element._id).then(() => element);
  }
);

export const fethcAddCard = createAsyncThunk(
  'cards/fethcAddCard',
  function (element: CardType) {
    return mestoApi.addCard(element.name, element.link).then((res) => res);
  }
);

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    cards: [] as any[],
    button: true
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fethcCardsData.fulfilled, (state, action) => {
      state.cards = action.payload;
    });
    builder.addCase(fethcDeleteCard.fulfilled, (state, action) => {
      state.cards = state.cards.filter((el: { _id: string; }) => el._id !== action.payload._id)
    });
    builder.addCase(fethcAddCard.pending, (state) => {
      state.button = false;
    });
    builder.addCase(fethcAddCard.fulfilled, (state, action) => {
      state.cards = [...state.cards, action.payload];
      state.button = true;
    });
  }
});

export default cardsSlice.reducer;