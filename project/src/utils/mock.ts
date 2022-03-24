import { address, datatype, image, lorem, name } from 'faker';
import { MAX_REVIEWS_COUNT, randomInteger } from '../const';
import { HouseType, Offer } from '../types/offer';
import { Review } from '../types/review';

const houseTypes: HouseType[] = [
  HouseType.Apartment,
  HouseType.Hotel,
  HouseType.House,
  HouseType.PrivateRoom,
];

const createOffer = (id: number) => {
  const offer: Offer = {
    bedroomsCount: datatype.number(5),
    description: lorem.sentences(3),
    guestsCount: datatype.number(5),
    header: lorem.sentence(1),
    city: {
      name: address.cityName(),
      location: {
        latitude: parseFloat(address.latitude()),
        longitude: parseFloat(address.longitude()),
        zoom: 15,
      },
    },
    images: new Array(4).fill('').map(() => image.imageUrl()),
    householdItems: new Array(10).fill('').map(() => lorem.word()),
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
    owner: {
      id: 1,
      isPro: datatype.boolean(),
      name: name.firstName(),
      avatarImage: image.avatar(),
    },
    houseType: houseTypes[randomInteger(0, houseTypes.length - 1)],
  };

  return offer;
};

const createReview = (id: number) => {
  const review: Review = {
    id,
    comment: lorem.sentences(3),
    rating: datatype.number(5),
    date: datatype.datetime().toUTCString(),
    user: {
      id: 1,
      isPro: datatype.boolean(),
      name: name.firstName(),
      avatarImage: image.imageUrl(),
    },
  };

  return review;
};

export const makeFakeOffers = (): Offer[] =>
  new Array(4).fill(null).map((_offer, index) => createOffer(index));

export const makeFakeReviews = (): Review[] =>
  new Array(MAX_REVIEWS_COUNT).fill(null).map((_review,  index) => createReview(index));

export const ONE_ACTION = 'UNKNOWN_ACTION';
