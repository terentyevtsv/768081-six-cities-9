import { useState, MouseEvent } from 'react';
import { Offer } from '../../types/offer';
import RentalOfferCard from '../rental-offer-card/rental-offer-card';

type RentalOfferCardsProps = {
  offers: Offer[]
};

function RentalOfferCards({offers}: RentalOfferCardsProps) {
  const [, setActiveOfferId] = useState(-1);

  const handleMouseOver = (evt: MouseEvent<HTMLDivElement>) => {
    const box = evt.currentTarget;
    setActiveOfferId(parseInt(box.id, 10));
  };

  return (
    <div
      className="cities__places-list places__list tabs__content"
      onMouseOver={handleMouseOver}
    >
      {
        offers.map((offer) =>
          <RentalOfferCard key={offer.id} offer={offer}/>)
      }
    </div>
  );
}

export default RentalOfferCards;
