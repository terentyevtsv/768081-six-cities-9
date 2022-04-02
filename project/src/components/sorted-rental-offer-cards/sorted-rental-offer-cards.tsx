import { Offer, PlaceCardType } from '../../types/offer';
import RentalOfferCards from '../rental-offer-cards/rental-offer-cards';
import SortOptions from '../sort-options/sort-options';

type SortedRentalOfferCardsProps = {
  onOfferCardHover(offer: Offer): void,
  sortedOffers: Offer[]
}

function SortedRentalOfferCards({onOfferCardHover, sortedOffers}: SortedRentalOfferCardsProps) {
  return (
    <>
      <SortOptions/>
      <RentalOfferCards
        onOfferCardHover={onOfferCardHover}
        placeCardType={PlaceCardType.CityPlaceCard}
        offers={sortedOffers}
      />
    </>
  );
}

export default SortedRentalOfferCards;
