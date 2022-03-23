import { useAppSelector } from '../../hooks/hooks';
import { getSortedOffers } from '../../rental';
import { getSelectedCityOffers, getSortType } from '../../store/rental/selectors';
import { Offer, PlaceCardType } from '../../types/offer';
import RentalOfferCards from '../rental-offer-cards/rental-offer-cards';
import SortOptions from '../sort-options/sort-options';

type SortedRentalOfferCardsProps = {
  onOfferCardHover(offer: Offer): void
}

function SortedRentalOfferCards({onOfferCardHover}: SortedRentalOfferCardsProps) {
  const tempState = useAppSelector((state) => state);
  const offers = getSelectedCityOffers(tempState);
  const sortType = getSortType(tempState);

  const sortedOffers = getSortedOffers(offers, sortType);
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
