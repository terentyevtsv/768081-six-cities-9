import { DEFAULT_OFFER } from '../../const';
import { makeFakeOffers, ONE_ACTION } from '../../utils/mock';
import {
  loadFavoriteOffers,
  loadNearOffers,
  loadOffers,
  offersData,
  setCurrentOffer,
  setIsOfferExist
} from './offers-data';

const offers = makeFakeOffers();

describe('Reducer: offersData', () => {
  it('without additional parameters should return initial state', () => {
    expect(offersData.reducer(void 0, {type: ONE_ACTION}))
      .toEqual({
        allOffers: [],
        favoriteOffers: [],
        currentOffer: DEFAULT_OFFER,
        isOfferExist: true,
        nearOffers: [],
        areAllOffersLoaded: false,
      });
  });

  it('should update offers by load offers', () => {
    const state = {
      allOffers: [],
      favoriteOffers: [],
      currentOffer: DEFAULT_OFFER,
      isOfferExist: true,
      nearOffers: [],
      areAllOffersLoaded: false,
    };
    expect(offersData.reducer(state, loadOffers(offers)))
      .toEqual({
        allOffers: offers,
        favoriteOffers: [],
        currentOffer: DEFAULT_OFFER,
        isOfferExist: true,
        nearOffers: [],
        areAllOffersLoaded: true,
      });
  });

  it('should update favorite offers by load favorite offers', () => {
    const state = {
      allOffers: [],
      favoriteOffers: [],
      currentOffer: DEFAULT_OFFER,
      isOfferExist: true,
      nearOffers: [],
      areAllOffersLoaded: true,
    };
    expect(offersData.reducer(state, loadFavoriteOffers(offers)))
      .toEqual({
        allOffers: [],
        favoriteOffers: offers,
        currentOffer: DEFAULT_OFFER,
        isOfferExist: true,
        nearOffers: [],
        areAllOffersLoaded: true,
      });
  });

  it('should update current offer', () => {
    const state = {
      allOffers: [],
      favoriteOffers: [],
      currentOffer: DEFAULT_OFFER,
      isOfferExist: true,
      nearOffers: [],
      areAllOffersLoaded: true,
    };
    expect(offersData.reducer(state, setCurrentOffer(offers[0])))
      .toEqual({
        allOffers: [],
        favoriteOffers: [],
        currentOffer: offers[0],
        isOfferExist: true,
        nearOffers: [],
        areAllOffersLoaded: true,
      });
  });

  it('should update near offers by load near offers', () => {
    const state = {
      allOffers: [],
      favoriteOffers: [],
      currentOffer: DEFAULT_OFFER,
      isOfferExist: true,
      nearOffers: [],
      areAllOffersLoaded: true,
    };
    const nearOffers = [offers[1], offers[2], offers[3]];

    expect(offersData.reducer(state, loadNearOffers(nearOffers)))
      .toEqual({
        allOffers: [],
        favoriteOffers: [],
        currentOffer: DEFAULT_OFFER,
        isOfferExist: true,
        nearOffers,
        areAllOffersLoaded: true,
      });
  });

  it('isOfferExist should be true if offer was found by id', () => {
    const state = {
      allOffers: [],
      favoriteOffers: [],
      currentOffer: DEFAULT_OFFER,
      isOfferExist: false,
      nearOffers: [],
      areAllOffersLoaded: true,
    };

    expect(offersData.reducer(state, setIsOfferExist(true)))
      .toEqual({
        allOffers: [],
        favoriteOffers: [],
        currentOffer: DEFAULT_OFFER,
        isOfferExist: true,
        nearOffers: [],
        areAllOffersLoaded: true,
      });
  });

  it('isOfferExist should be false if offer was not found by id', () => {
    const state = {
      allOffers: [],
      favoriteOffers: [],
      currentOffer: DEFAULT_OFFER,
      isOfferExist: true,
      nearOffers: [],
      areAllOffersLoaded: true,
    };
    expect(offersData.reducer(state, setIsOfferExist(false)))
      .toEqual({
        allOffers: [],
        favoriteOffers: [],
        currentOffer: DEFAULT_OFFER,
        isOfferExist: false,
        nearOffers: [],
        areAllOffersLoaded: true,
      });
  });
});
