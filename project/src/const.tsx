export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  NotFound = '*'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const MAX_RATING = 5;

export const getRatingPercent = (rating: number): number =>
  Math.round(rating) / MAX_RATING * 100;

export const URL_PIN_DEFAULT = 'img/pin.svg';
export const URL_PIN_CURRENT = 'img/pin-active.svg';

export const PIN_WIDTH = 42;
export const PIN_HEIGHT = 68;

