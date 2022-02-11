import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Setting = {
  STAY_PLACES_COUNT: 312,
};

ReactDOM.render(
  <React.StrictMode>
    <App stayPlacesCount={Setting.STAY_PLACES_COUNT}/>
  </React.StrictMode>,
  document.getElementById('root'));
