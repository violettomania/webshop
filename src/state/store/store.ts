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
import { UserState } from '../slices/userSlice';

// TODO: add types - UserState, jwt
// makes sure that state persists even after a page refresh
const SetTransform = createTransform(
  // transform state going to localStorage
  (inboundState: any, key) => {
    if (key === 'user' && typeof inboundState === 'object') {
      const inboundStateClone = { ...inboundState };
      const { registeredUser } = inboundStateClone;
      if (registeredUser && registeredUser.jwt) {
        Cookies.set('token', registeredUser.jwt);
      }
      return inboundStateClone;
    }
    return inboundState;
  },
  // transform state being rehydrated
  (outboundState: any, key) => {
    if (key === 'user' && typeof outboundState === 'object') {
      const jwt = Cookies.get('token');
      if (jwt && outboundState.registeredUser) {
        return {
          ...outboundState,
          registeredUser: { ...outboundState.registeredUser, jwt },
        };
      }
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

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);

export default store;
