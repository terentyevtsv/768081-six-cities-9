import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AuthorizationStatus, NameSpace } from '../../const';
import NotFoundPage from './not-found-page';

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.User]: {authorizationStatus: AuthorizationStatus.Auth},
});

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NotFoundPage/>
        </BrowserRouter>
      </Provider>,
    );

    const headerElement = screen.getByText('Not Found');
    const linkElement = screen.getByText('Go to main page');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
