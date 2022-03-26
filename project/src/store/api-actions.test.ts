import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { RootState } from '../types/state';
import { Action } from '@reduxjs/toolkit';
import { APIRoute, HTTP_CODE, randomInteger } from '../const';
import { addReviewAction, fetchOffersAction, getAuthAction, getFavoriteOffersAction, getNearOffersAction, getOfferAction, getReviewsAction, setAuthAction, setIsFavoriteAction } from './api-actions';
import { changeAuthorizationStatus } from './user-process/user-process';
import { fakeAuthData, makeFakeComments, makeFakeHotels } from '../utils/mock';
import { loadFavoriteOffers, loadNearOffers, loadOffers, setCurrentOffer, setIsOfferExist } from './offers-data/offers-data';
import { ErrorType } from '../types/error';
import { loadOfferReviews } from './reviews-data/reviews-data';
import { changeSubmitStatus } from './rental/rental';

const error401: ErrorType = {
  status: HTTP_CODE.UNAUTHORIZED,
  data: {
    error: 'UNAUTHORIZED',
  },
};

const error404: ErrorType = {
  status: HTTP_CODE.NOT_FOUND,
  data: {
    error: 'NOT_FOUND',
  },
};

const error400: ErrorType = {
  status: HTTP_CODE.BAD_REQUEST,
  data: {
    error: 'BAD_REQUEST',
  },
};

const fakeOffers = makeFakeHotels();
const fakeOffer = fakeOffers[randomInteger(0, fakeOffers.length - 1)];

const fakeComments = makeFakeComments();
const fakeComment = fakeComments[randomInteger(0, fakeComments.length - 1)];

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      RootState,
      Action,
      ThunkDispatch<RootState, typeof api, Action>
    >(middlewares);

  it('should authorization change status when server return 200', async () => {
    mockAPI
      .onGet(APIRoute.Login)
      .reply(HTTP_CODE.OK, {});

    const store = mockStore();

    // Проверка, что перед запросом на сервер действия не выполнялись
    expect(store.getActions()).toEqual([]);

    // выполнение запроса на сервер
    await store.dispatch(getAuthAction());

    const actions = store.getActions().map(({type}) => type);

    // Проверяем, что после успешного запроса выполняется
    // действие выставления статуса авторизации
    expect(actions).toContain(changeAuthorizationStatus.toString());
  });

  it('should authorization change status when server return 401', async () => {
    mockAPI
      .onGet(APIRoute.Login)
      .reply(HTTP_CODE.UNAUTHORIZED, error401);

    const store = mockStore();

    // Проверка, что перед запросом на сервер действия не выполнялись
    expect(store.getActions()).toEqual([]);

    // выполнение запроса на сервер
    await store.dispatch(getAuthAction());

    const actions = store.getActions().map(({type}) => type);

    // Проверяем, что после успешного запроса выполняется
    // действие выставления статуса авторизации
    expect(actions).toContain(changeAuthorizationStatus.toString());
  });

  it('should dispatch loadOffers when get hotels', async () => {
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(HTTP_CODE.OK, fakeOffers);

    const store = mockStore();

    // Проверка, что перед запросом на сервер действия не выполнялись
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({type}) => type);

    // Проверяем, что после успешного запроса отелей выполняется
    // действие обновления списка предложений
    expect(actions).toContain(loadOffers.toString());
  });

  it('should change auth when returns 400', async () => {
    mockAPI
      .onPost(APIRoute.Login, fakeAuthData)
      .reply(HTTP_CODE.BAD_REQUEST, error400);

    const store = mockStore();

    // Проверка, что перед запросом на сервер действия не выполнялись
    expect(store.getActions()).toEqual([]);

    await store.dispatch(setAuthAction(fakeAuthData));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(changeAuthorizationStatus.toString());
  });

  it('should change auth status then user unauthorized', async () => {
    const offerId = fakeOffer.id;
    const {isFavorite} = fakeOffer;

    mockAPI
      .onPost(`${APIRoute.Favorite}/${offerId}/${isFavorite ? 1 : 0}`)
      .reply(HTTP_CODE.UNAUTHORIZED, error401);

    const store = mockStore();

    // Проверка, что перед запросом на сервер действия не выполнялись
    expect(store.getActions()).toEqual([]);

    await store.dispatch(setIsFavoriteAction({isFavorite, offerId}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(changeAuthorizationStatus.toString());
  });

  it('should dispatch loadFavoriteOffers when /favorite return 200', async () => {
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(HTTP_CODE.OK, fakeOffers);

    const store = mockStore();

    // Проверка, что перед запросом на сервер действия не выполнялись
    expect(store.getActions()).toEqual([]);

    await store.dispatch(getFavoriteOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadFavoriteOffers.toString());
  });

  it('should change auth status when /favorite return 401', async () => {
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(HTTP_CODE.UNAUTHORIZED, error401);

    const store = mockStore();

    // Проверка, что перед запросом на сервер действия не выполнялись
    expect(store.getActions()).toEqual([]);

    await store.dispatch(getFavoriteOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(changeAuthorizationStatus.toString());
  });

  it('should change current offer and isOfferExist when /hotels/:hotelId returns 200', async () => {
    mockAPI
      .onGet(`${APIRoute.Offers}/${fakeOffer.id}`)
      .reply(HTTP_CODE.OK, fakeOffer);

    const store = mockStore();

    // Проверка, что перед запросом на сервер действия не выполнялись
    expect(store.getActions()).toEqual([]);

    await store.dispatch(getOfferAction(fakeOffer.id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(setCurrentOffer.toString());
    expect(actions).toContain(setIsOfferExist.toString());
  });

  it('should change isOfferExist when /hotels/:hotelId returns 404', async () => {
    mockAPI
      .onGet(`${APIRoute.Offers}/${fakeOffer.id}`)
      .reply(HTTP_CODE.NOT_FOUND, error404);

    const store = mockStore();

    // Проверка, что перед запросом на сервер действия не выполнялись
    expect(store.getActions()).toEqual([]);

    await store.dispatch(getOfferAction(fakeOffer.id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(setIsOfferExist.toString());
  });

  it('should dispatch loadNearOffers when getNearOffers returns 200', async () => {
    mockAPI
      .onGet(`${APIRoute.Offers}/${fakeOffer.id}/nearby`)
      .reply(HTTP_CODE.OK, fakeOffers);

    const store = mockStore();

    // Проверка, что перед запросом на сервер действия не выполнялись
    expect(store.getActions()).toEqual([]);

    await store.dispatch(getNearOffersAction(fakeOffer.id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadNearOffers.toString());
  });

  it('should dispatch loadOfferReviews when getReviews returns 200', async () => {
    mockAPI
      .onGet(`${APIRoute.Comments}/${fakeOffer.id}`)
      .reply(HTTP_CODE.OK, fakeComments);

    const store = mockStore();

    // Проверка, что перед запросом на сервер действия не выполнялись
    expect(store.getActions()).toEqual([]);

    await store.dispatch(getReviewsAction(fakeOffer.id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadOfferReviews.toString());
  });

  it('should change submit status and dispatch loadOfferReviews', async () => {
    mockAPI
      .onPost(`${APIRoute.Comments}/${fakeOffer.id}`)
      .reply(HTTP_CODE.OK, fakeComments);

    const store = mockStore();

    // Проверка, что перед запросом на сервер действия не выполнялись
    expect(store.getActions()).toEqual([]);

    const {comment, rating} = fakeComment;
    await store.dispatch(
      addReviewAction({offerId: fakeOffer.id, comment, rating}),
    );

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadOfferReviews.toString());
    expect(actions).toContain(changeSubmitStatus.toString());
  });

  it('should change submit status when 401', async () => {
    mockAPI
      .onPost(`${APIRoute.Comments}/${fakeComment.id}`)
      .reply(HTTP_CODE.UNAUTHORIZED, error401);

    const store = mockStore();

    // Проверка, что перед запросом на сервер действия не выполнялись
    expect(store.getActions()).toEqual([]);

    const {comment, rating} = fakeComment;
    await store.dispatch(
      addReviewAction({offerId: fakeOffer.id, comment, rating}),
    );

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(changeSubmitStatus.toString());
  });
});
