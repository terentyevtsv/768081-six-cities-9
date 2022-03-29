import { NameSpace } from '../../const';
import { Offer } from '../../types/offer';
import { RootState } from '../../types/state';

export const getAllOffers = (state: RootState): Offer[] =>
  state[NameSpace.OffersData].allOffers;

export const getAreAllOffersLoadedStatus = (state: RootState): boolean =>
  state[NameSpace.OffersData].areAllOffersLoaded;

export const getFavoriteOffers = (state: RootState): Offer[] =>
  state[NameSpace.OffersData].favoriteOffers;

export const getCurrentOffer = (state: RootState): Offer =>
  state[NameSpace.OffersData].currentOffer;

export const getNearOffers = (state: RootState): Offer[] =>
  state[NameSpace.OffersData].nearOffers;

export const getIsOfferExist =  (state: RootState): boolean =>
  state[NameSpace.OffersData].isOfferExist;

