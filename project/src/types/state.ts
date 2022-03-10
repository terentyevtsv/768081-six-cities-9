import { createStore } from 'redux';
import { reducer } from '../store/reducer';
import thunk from 'redux-thunk';
import {applyMiddleware} from 'redux';
import {createAPI} from '../services/api';
import { redirect } from '../store/middlewares/redirect';

export const api = createAPI();

export const store = createStore(
  reducer,
  applyMiddleware(thunk, redirect),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
