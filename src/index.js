import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import Routers from './env/routers';
import './styling/styles/all.scss';
import './styling/fontawesome/css/all.css';
// import React from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Routers />
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
