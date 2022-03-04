import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';

export const changeCityAction = createAction<string>('changeCity');
export const fillOffersAction = createAction<Offer[]>('fillOffers');
