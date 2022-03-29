import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute, AuthorizationStatus, NameSpace, randomInteger, SortType } from '../../const';
import { makeFakeCity, makeFakeOffers } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import App from './app';
import thunk from 'redux-thunk';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const fakeOffers = makeFakeOffers();
const fakeOffer = fakeOffers[randomInteger(0, fakeOffers.length - 1)];

const store = mockStore({
  [NameSpace.Rental]: {
    city: makeFakeCity(),
    offers: [],
    sortType: SortType.Popular,
  },
  [NameSpace.OffersData]: {
    areAllOffersLoaded: true,
    favoriteOffers: fakeOffers,
    allOffers: [],
    currentOffer: fakeOffer,
    nearOffers: [],
    isOfferExist: true,
  },
  [NameSpace.ReviewsData]: {
    offerReviews: [],
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App/>
    </HistoryRouter>
  </Provider>
);

describe('App routing', () => {
  it('should render AllRentalOffersPage when Auth user navigate to /', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
  });

  it('should render AllRentalOffersPage when Auth user navigate to /login', () => {
    history.push(AppRoute.SignIn);

    render(fakeApp);

    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
  });

  it('should render Favorites when route to Auth user favorites', () => {
    history.push(AppRoute.Favorites);

    render(fakeApp);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render RentalOfferPage when user navigate to /offer/:id', () => {
    history.push(`/offer/${fakeOffer.id}`);

    render(fakeApp);

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
  });

  it('should render NotFound when user navigate fake App route', () => {
    history.push('/fake');

    render(fakeApp);

    const headerElement = screen.getByText('Not Found');
    const linkElement = screen.getByText('Go to main page');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
