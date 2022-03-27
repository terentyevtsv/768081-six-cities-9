import { HouseType, Offer } from './types/offer';

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

export const cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export enum SortType {
  Popular = 'Popular',
  LowPriceFirst = 'Price: low to high',
  HighPriceFirst = 'Price: high to low',
  TopRatedFirst = 'Top rated first'
}

export const sortOptions = [
  SortType.Popular,
  SortType.LowPriceFirst,
  SortType.HighPriceFirst,
  SortType.TopRatedFirst,
];

export enum APIRoute {
  Offers = '/hotels',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout =  '/logout'
}

export enum HTTP_CODE {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  Ok = 200,
}

export enum NameSpace {
  OffersData = 'OFFERS_DATA',   // загрузочные данные по предложениям из сервера
  ReviewsData = 'REVIEWS_DATA', // загрузочные данные по комментариям выбранного предложения
  User = 'USER',                // статус логина пользователя
  Rental = 'RENTAL'             // объекты внутренней логики работы с арендой
}

export const OFFER_DEFAULT_ID = -1;

export const DEFAULT_OFFER: Offer = {
  id: OFFER_DEFAULT_ID,
  city: {
    name: '',
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    },
  },
  bedroomsCount: 0,
  description: '',
  guestsCount: 0,
  header: '',
  houseType: HouseType.Apartment,
  householdItems: [],
  images: [],
  isFavorite: false,
  isPremium: false,
  location: {
    latitude: 0,
    longitude: 0,
    zoom: 0,
  },
  owner: {
    id: 0,
    avatarImage: '',
    isPro: false,
    name: '',
  },
  previewImage: '',
  price: 0,
  rating: 0,
};

export const MAX_IMAGES_COUNT = 6;
export const MAX_REVIEWS_COUNT = 10;

export const MIN_REVIEW_LENGTH = 50;
export const MAX_REVIEW_LENGTH = 300;

export enum SubmitStatus {
  Sent,
  Sending,
  Error
}

export const randomInteger = (min: number, max: number) => {
  // случайное число от min до (max+1)
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
