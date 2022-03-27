import { SortType, SubmitStatus } from '../../const';
import { makeFakeOffers } from '../../utils/mock';
import {
  changeCity,
  changeSortOption,
  changeSubmitStatus,
  fillOffers,
  rental
} from './rental';

const offers = makeFakeOffers();
const oneCity = 'New  York';
const anotherCity = 'Moscow';

describe('Reducer: rental', () => {
  it('should change city', () => {
    const state = {
      city: oneCity,
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
      city: oneCity,
      offers: [],
      sortType: SortType.Popular,
      submitStatus: SubmitStatus.Sent,
    };
    expect(rental.reducer(state, fillOffers(offers)))
      .toEqual({
        city: oneCity,
        offers,
        sortType: SortType.Popular,
        submitStatus: SubmitStatus.Sent,
      });
  });

  it('should change sort option', () => {
    const state = {
      city: oneCity,
      offers: [],
      sortType: SortType.Popular,
      submitStatus: SubmitStatus.Sent,
    };
    expect(rental.reducer(state, changeSortOption(SortType.HighPriceFirst)))
      .toEqual({
        city: oneCity,
        offers: [],
        sortType: SortType.HighPriceFirst,
        submitStatus: SubmitStatus.Sent,
      });
  });

  it('should change submit status', () => {
    const state = {
      city: oneCity,
      offers: [],
      sortType: SortType.Popular,
      submitStatus: SubmitStatus.Sent,
    };
    expect(rental.reducer(state, changeSubmitStatus(SubmitStatus.Sending)))
      .toEqual({
        city: oneCity,
        offers: [],
        sortType: SortType.Popular,
        submitStatus: SubmitStatus.Sending,
      });
  });
});
