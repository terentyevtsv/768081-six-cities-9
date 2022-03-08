import { Hotel, HouseType, Offer } from '../types/offer';

type AdaptHouseType = {
  [houseType: string]: HouseType
};

const houseTypes: AdaptHouseType = {
  'apartment': HouseType.Apartment,
  'room': HouseType.PrivateRoom,
  'house': HouseType.House,
  'hotel': HouseType.Hotel,
};

export const getOffer = (hotel: Hotel): Offer => {
  const offer: Offer = {
    id: hotel.id,
    bedroomsCount: hotel.bedrooms,
    header: hotel.title,
    houseType: houseTypes[hotel.type],
    price: hotel.price,
    rating: hotel.rating,
    previewImage: hotel.previewImage,
    isPremium: hotel.isPremium,
    isFavorite: hotel.isFavorite,
    description: hotel.description,
    guestsCount: hotel.maxAdults,
    householdItems: hotel.goods,
    images: hotel.images,
    city: hotel.city,
    location: hotel.location,
    owner: {
      id: hotel.host.id,
      isPro: hotel.host.isPro,
      avatarImage: hotel.host.avatarUrl,
      name: hotel.host.name,
    },
  };

  return offer;
};
