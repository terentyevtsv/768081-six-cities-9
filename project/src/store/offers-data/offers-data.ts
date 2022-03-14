import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OffersData } from '../../types/state';

const initialState: OffersData = {
  allOffers: [],
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
  },
});

export const { loadOffers } = offersData.actions;
