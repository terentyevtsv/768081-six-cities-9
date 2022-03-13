import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OffersData } from '../../types/state';

const initialState: OffersData = {
  allOffers: [],
  favoriteOffers: [],
  areAllOffersLoaded: false,
};

export const offersData = createSlice({
  name: NameSpace.OffersData,
  initialState,
  reducers: {
    loadOffers: (state, action) => {
      state.allOffers = action.payload;
      state.areAllOffersLoaded = true;
    },
    loadFavoriteOffers: (state, action) => {
      state.favoriteOffers = action.payload;
    },
  },
});

export const { loadOffers, loadFavoriteOffers } = offersData.actions;
