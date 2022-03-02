import { Offer } from './types/offer';

export const getOffers = (cityName: string, allOffers: Offer[]) =>
  allOffers.filter((offer) => offer.city.name === cityName);
