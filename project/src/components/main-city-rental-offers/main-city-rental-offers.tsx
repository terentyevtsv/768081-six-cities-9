import { useState } from 'react';
import { City, Offer } from '../../types/offer';
import Map from '../map/map';
import SortedRentalOfferCards from '../sorted-rental-offer-cards/sorted-rental-offer-cards';

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
        <SortedRentalOfferCards
          onOfferCardHover={setSelectedOffer}
          sortedOffers={currentOffers}
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
