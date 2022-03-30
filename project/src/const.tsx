import { HouseType, Offer } from './types/offer';

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

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

export enum PinURL {
  Default = 'img/pin.svg',
  Current = 'img/pin-active.svg'
}

export enum PinSize {
  Width = 42,
  Height = 68
}

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

export enum HttpCode {
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

export enum MaxObjectNumber {
  ImagesCount = 6,
  ReviewsCount = 10
}

export enum ReviewLength {
  Min = 50,
  Max = 300
}

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

export const validateEmail = (value: string) =>
  EMAIL_REGEXP.test(value);

export enum BookmarkStatus {
  In = 'In bookmarks',
  To = 'To bookmarks'
}
