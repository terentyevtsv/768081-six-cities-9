import { CityOffers } from './types/offer';

export const getOffers = (cityOffers: CityOffers) =>
  cityOffers.offers.filter((offer) => offer.city.name === cityOffers.city);
