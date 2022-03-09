import { useState } from 'react';
import { City, Offer, PlaceCardType } from '../../types/offer';
import Map from '../map/map';
import RentalOfferCards from '../rental-offer-cards/rental-offer-cards';
import SortOptions from '../sort-options/sort-options';

type MainCityRentalOffersProps = {
  currentOffers: Offer[],
  cityName: string,
  city: City,
};

function MainCityRentalOffers({currentOffers, cityName, city}: MainCityRentalOffersProps) {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{currentOffers.length} places to stay in {cityName}</b>
        <SortOptions/>
        <RentalOfferCards
          onOfferCardHover={setSelectedOffer}
          placeCardType={PlaceCardType.CityPlaceCard}
          offers={currentOffers}
        />
      </section>
      <div className="cities__right-section">
        <Map
          className="cities__map map"
          city={city}
          offers={currentOffers}
          selectedOffer={selectedOffer}
        />
      </div>
    </div>
  );
}

export default MainCityRentalOffers;
