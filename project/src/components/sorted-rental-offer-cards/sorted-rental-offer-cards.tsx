import { useAppSelector } from '../../hooks/hooks';
import { getSortedCityOffers } from '../../store/rental/selectors';
import { Offer, PlaceCardType } from '../../types/offer';
import RentalOfferCards from '../rental-offer-cards/rental-offer-cards';
import SortOptions from '../sort-options/sort-options';

type SortedRentalOfferCardsProps = {
  onOfferCardHover(offer: Offer): void
}

function SortedRentalOfferCards({onOfferCardHover}: SortedRentalOfferCardsProps) {
  const sortedOffers = useAppSelector(getSortedCityOffers);
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
