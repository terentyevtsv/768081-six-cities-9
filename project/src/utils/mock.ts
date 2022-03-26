import { address, datatype, image, internet, lorem, name } from 'faker';
import { MAX_REVIEWS_COUNT, randomInteger } from '../const';
import { getOffer, getReview } from '../services/adaptor';
import { AuthData } from '../types/auth-data';
import { Hotel, HouseType, Offer } from '../types/offer';
import { Comment, Review } from '../types/review';

const houseTypes: HouseType[] = [
  HouseType.Apartment,
  HouseType.Hotel,
  HouseType.House,
  HouseType.PrivateRoom,
];

const createHotel = (id: number) => {
  const hotel: Hotel = {
    bedrooms: datatype.number(5),
    description: lorem.sentences(3),
    maxAdults: datatype.number(5),
    title: lorem.sentence(1),
    city: {
      name: address.cityName(),
      location: {
        latitude: parseFloat(address.latitude()),
        longitude: parseFloat(address.longitude()),
        zoom: 15,
      },
    },
    images: new Array(4).fill('').map(() => image.imageUrl()),
    goods: new Array(10).fill('').map(() => lorem.word()),
    isFavorite: datatype.boolean(),
    isPremium: datatype.boolean(),
    price: datatype.number(200),
    id,
    previewImage: image.imageUrl(),
    rating: datatype.number(5),
    location: {
      latitude: parseFloat(address.latitude()),
      longitude: parseFloat(address.longitude()),
      zoom: 15,
    },
    host: {
      id: 1,
      isPro: datatype.boolean(),
      name: name.firstName(),
      avatarUrl: image.avatar(),
    },
    type: houseTypes[randomInteger(0, houseTypes.length - 1)],
  };

  return hotel;
};

const createComment = (id: number) => {
  const review: Comment = {
    id,
    comment: lorem.sentences(3),
    rating: datatype.number(5),
    date: datatype.datetime().toString(),
    user: {
      id: 1,
      isPro: datatype.boolean(),
      name: name.firstName(),
      avatarUrl: image.imageUrl(),
    },
  };

  return review;
};

const OFFERS_COUNT = 4;

export const makeFakeOffers = (): Offer[] =>
  new Array(OFFERS_COUNT).fill(null).map((_offer, index) => getOffer(createHotel(index)));

export const makeFakeHotels = (): Hotel[] =>
  new Array(OFFERS_COUNT).fill(null).map((_offer, index) => createHotel(index));

export const makeFakeReviews = (): Review[] =>
  new Array(MAX_REVIEWS_COUNT).fill(null).map((_review,  index) => getReview(createComment(index)));

export const makeFakeComments = (): Comment[] =>
  new Array(MAX_REVIEWS_COUNT).fill(null).map((_comment, index) => createComment(index));

export const fakeAuthData: AuthData = {
  email: internet.email(),
  password: internet.password(),
};

export const ONE_ACTION = 'UNKNOWN_ACTION';
