import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';
import store, { persistor } from './state/store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HashRouter basename='/'>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
          <ToastContainer position='bottom-right' />
        </PersistGate>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
