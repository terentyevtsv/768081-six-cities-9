import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OffersData } from '../../types/state';

const initialState: OffersData = {
  allOffers: [],
  favoriteOffers: [],
  currentOffer: null,
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
    setCurrentOffer: (state, action) => {
      state.currentOffer = action.payload;
    },
  },
});

export const {
  loadOffers,
  loadFavoriteOffers,
  setCurrentOffer,
} = offersData.actions;
