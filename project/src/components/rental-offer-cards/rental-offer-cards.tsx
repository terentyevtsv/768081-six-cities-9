import { Offer } from '../../types/offer';
import RentalOfferCard from '../rental-offer-card/rental-offer-card';

type RentalOfferCardsProps = {
  offers: Offer[],
  onOfferCardHover(offer: Offer): void
};

function RentalOfferCards({offers, onOfferCardHover}: RentalOfferCardsProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <RentalOfferCard
            key={offer.id}
            offer={offer}
            onMouseOver={onOfferCardHover}
          />
        ))
      }
    </div>
  );
}

export default RentalOfferCards;
