import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cartReducer from '../slices/cartSlice';
import featuredProductsReducer from '../slices/featuredProductsSlice';
import ordersReducer from '../slices/ordersSlice';
import productsReducer from '../slices/productsSlice';
import singleProductReducer from '../slices/singleProductSlice';
import userReducer from '../slices/userSlice';

// Create a transform to split the state between localStorage and cookies
const SetTransform = createTransform(
  (inboundState: any, key) => {
    if (key === 'user' && typeof inboundState === 'object') {
      const inboundStateClone = { ...inboundState.registeredUser } as {
        jwt?: string;
      };
      const { jwt } = inboundStateClone;
      if (jwt) {
        Cookies.set('token', jwt);
        delete inboundStateClone.jwt;
      }
      return inboundStateClone;
    }
    return inboundState;
  },
  // transform state being rehydrated
  (outboundState: any, key) => {
    if (key === 'user' && typeof outboundState === 'object') {
      const jwt = Cookies.get('token');
      return { ...outboundState.registeredUser, jwt } as { jwt?: string };
    }
    return outboundState;
  }
);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'cart'],
  transforms: [SetTransform],
};

const rootReducer = combineReducers({
  paged: productsReducer,
  featured: featuredProductsReducer,
  orders: ordersReducer,
  single: singleProductReducer,
  cart: cartReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// TODO: temporary solution to rehydrate the state from localStorage
window.addEventListener('storage', () => {
  // Get the item from localStorage
  const persistedState = localStorage.getItem('persist:root');

  // If the item is not null, parse it and dispatch the action
  if (persistedState !== null) {
    store.dispatch({
      type: 'persist/REHYDRATE',
      payload: JSON.parse(persistedState),
    });
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);

export default store;
