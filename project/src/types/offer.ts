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

export enum PlaceCardType {
  CityPlaceCard = 0,
  NearPlaceCard = 1
}

export type Hotel = {
  bedrooms: number
  city: {
    location: {
      latitude: number
      longitude: number
      zoom: number
    }
    name: string
  }
  description: string
  goods: [string]
  host: {
    avatarUrl: string
    id: number
    isPro: boolean
    name: string
  }
  id: number
  images: [string]
  isFavorite: boolean
  isPremium: boolean
  location: {
    latitude: number
    longitude: number
    zoom: number
  }
  maxAdults: number
  previewImage: string
  price: number
  rating: number
  title: string
  type: string
}

export type CityContent = {
  currentOffers: Offer[],
  cityName: string,
  areAllOffersLoaded: boolean
}
