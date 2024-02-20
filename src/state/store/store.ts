import { combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../slices/productsSlice';
import featuredProductsReducer from '../slices/featuredProductsSlice';
import ordersReducer from '../slices/ordersSlice';
import singleProductReducer from '../slices/singleProductSlice';
import cartReducer from '../slices/cartSlice';
import userReducer from '../slices/userSlice';

const persistConfig = {
  key: 'root',
  storage,
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
