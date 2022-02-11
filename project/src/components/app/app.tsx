import AllRentalOffersPage from '../all-rental-offers-page/all-rental-offers-page';

type AppProps = {
  stayPlacesCount: number
};

function App({stayPlacesCount}: AppProps): JSX.Element {
  return (
    <AllRentalOffersPage
      stayPlacesCount={stayPlacesCount}
    />
  );
}

export default App;
