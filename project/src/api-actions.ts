import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from './const';
import { getOffer } from './services/adaptor';
import { loadOffersAction } from './store/action';
import { Hotel } from './types/offer';
import { api, store } from './types/state';

export const fetchOffersAction = createAsyncThunk(
  'fetchOffers',
  async () => {
    const {data} = await api.get<Hotel[]>(APIRoute.Offers);
    const offers = data.map((hotel) => getOffer(hotel));
    store.dispatch(loadOffersAction(offers));
  },
);
