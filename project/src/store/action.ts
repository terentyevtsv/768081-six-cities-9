import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus, SortType } from '../const';
import { Offer } from '../types/offer';

export const changeCityAction = createAction<string>('changeCity');
export const fillOffersAction = createAction<Offer[]>('fillOffers');
export const changeSortOptionAction = createAction<SortType>('changeSortOption');
export const loadOffersAction = createAction<Offer[]>('loadOffers');
export const changeAuthorizationStatusAction = createAction<AuthorizationStatus>('changeAuthorizationStatus');
export const redirectToRouteAction = createAction<AppRoute>('redirectToRoute');
