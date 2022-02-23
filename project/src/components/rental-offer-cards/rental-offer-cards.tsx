import { useState } from 'react';
import { Offer } from '../../types/offer';
import RentalOfferCard from '../rental-offer-card/rental-offer-card';

type RentalOfferCardsProps = {
  offers: Offer[]
};

function RentalOfferCards({offers}: RentalOfferCardsProps) {
  const [, setActiveOffer] = useState<Offer>();

  const handleOfferCardMouseOver = (offer: Offer) => {
    setActiveOffer(offer);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <RentalOfferCard
            key={offer.id}
            offer={offer}
            onMouseOver={handleOfferCardMouseOver}
          />
        ))
      }
    </div>
  );
}

export default RentalOfferCards;
