import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ReviewsData } from '../../types/state';

const initialState: ReviewsData = {
  offerReviews: [],
};

export const reviewsData = createSlice({
  name: NameSpace.ReviewsData,
  initialState,
  reducers: {
    loadOfferReviews: (state, action) => {
      state.offerReviews = action.payload;
    },
  },
});

export const { loadOfferReviews } = reviewsData.actions;
