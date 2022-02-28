export type Location = {
  latitude: number,
  longitude: number,
  zoom: number
}

export type City = {
  name: string,
  location: Location
}

export type User = {
  id: number,
  avatarImage: string,
  name: string,
  isPro: boolean
};

export enum HouseType {
  Apartment = 'Apartment',
  PrivateRoom = 'Private room',
  House = 'House',
  Hotel = 'Hotel'
}

export type Offer = {
  id: number,
  previewImage: string,
  isPremium: boolean,
  price: number,
  header: string,
  houseType: HouseType,
  isFavorite: boolean,
  rating: number,
  images: string[],
  description: string,
  bedroomsCount: number,
  guestsCount: number,
  householdItems: string[],
  owner: User,
  city: City,
  location: Location
};

export enum MapType {
  CityOffersMap = 'cities__map',
  OfferMap = 'property__map'
}
