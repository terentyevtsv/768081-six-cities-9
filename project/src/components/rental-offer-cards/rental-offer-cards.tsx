import { Offer, PlaceCardType } from '../../types/offer';
import RentalOfferCard from '../rental-offer-card/rental-offer-card';

type RentalOfferCardsProps = {
  offers: Offer[],
  placeCardType: PlaceCardType,
  onOfferCardHover?: (offer: Offer) => void
};

function RentalOfferCards({offers, placeCardType, onOfferCardHover}
  : RentalOfferCardsProps) {
  const listContainers = placeCardType === PlaceCardType.CityPlaceCard
    ? 'cities__places-list places__list tabs__content'
    : 'near-places__list places__list';
  return (
    <div className={listContainers}>
      {
        offers.map((offer) => (
          <RentalOfferCard
            key={offer.id}
            placeCardType={placeCardType}
            offer={offer}
            onMouseOver={onOfferCardHover}
          />
        ))
      }
    </div>
  );
}

export default RentalOfferCards;
