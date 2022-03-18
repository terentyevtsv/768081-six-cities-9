import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_OFFER, NameSpace } from '../../const';
import { OffersData } from '../../types/state';

const initialState: OffersData = {
  allOffers: [],
  favoriteOffers: [],
  currentOffer: DEFAULT_OFFER,
  isOfferExist: true,
  nearOffers: [],
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
    loadNearOffers: (state, action) => {
      state.nearOffers = action.payload;
    },
    setIsOfferExist: (state, action) => {
      state.isOfferExist = action.payload;
    },
  },
});

export const {
  loadOffers,
  loadFavoriteOffers,
  setCurrentOffer,
  loadNearOffers,
  setIsOfferExist,
} = offersData.actions;
