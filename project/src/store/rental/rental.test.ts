import { SortType, SubmitStatus } from '../../const';
import { makeFakeOffers, ONE_ACTION } from '../../utils/mock';
import {
  changeCity,
  changeSortOption,
  changeSubmitStatus,
  fillOffers,
  rental
} from './rental';

const offers = makeFakeOffers();
const anotherCity = 'Amsterdam';

describe('Reducer: rental', () => {
  it('without additional parameters should return initial state', () => {
    expect(rental.reducer(void 0, {type: ONE_ACTION}))
      .toEqual({
        city: 'Paris',
        offers: [],
        sortType: SortType.Popular,
        submitStatus: SubmitStatus.Sent,
      });
  });

  it('should change city', () => {
    const state = {
      city: 'Paris',
      offers,
      sortType: SortType.Popular,
      submitStatus: SubmitStatus.Sent,
    };
    expect(rental.reducer(state, changeCity(anotherCity)))
      .toEqual({
        city: anotherCity,
        offers,
        sortType: SortType.Popular,
        submitStatus: SubmitStatus.Sent,
      });
  });

  it('should fill offers after city changed', () => {
    const state = {
      city: anotherCity,
      offers: [],
      sortType: SortType.Popular,
      submitStatus: SubmitStatus.Sent,
    };
    expect(rental.reducer(state, fillOffers(offers)))
      .toEqual({
        city: anotherCity,
        offers,
        sortType: SortType.Popular,
        submitStatus: SubmitStatus.Sent,
      });
  });

  it('should change sort option', () => {
    const state = {
      city: anotherCity,
      offers,
      sortType: SortType.Popular,
      submitStatus: SubmitStatus.Sent,
    };
    expect(rental.reducer(state, changeSortOption(SortType.HighPriceFirst)))
      .toEqual({
        city: anotherCity,
        offers,
        sortType: SortType.HighPriceFirst,
        submitStatus: SubmitStatus.Sent,
      });
  });

  it('should change submit status', () => {
    const state = {
      city: anotherCity,
      offers,
      sortType: SortType.Popular,
      submitStatus: SubmitStatus.Sent,
    };
    expect(rental.reducer(state, changeSubmitStatus(SubmitStatus.Sending)))
      .toEqual({
        city: anotherCity,
        offers,
        sortType: SortType.Popular,
        submitStatus: SubmitStatus.Sending,
      });
  });
});
