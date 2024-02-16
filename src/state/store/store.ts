import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../slices/productsSlice';
import featuredProductsReducer from '../slices/featuredProductsSlice';
import ordersReducer from '../slices/ordersSlice';
import singleProductReducer from '../slices/singleProductSlice';
import cartReducer from '../slices/cartSlice';
import userReducer from '../slices/userSlice';
import {
  localStorageMiddleware,
  preloadedState,
} from '../middleware/middleware';

const store = configureStore({
  reducer: {
    paged: productsReducer,
    featured: featuredProductsReducer,
    orders: ordersReducer,
    single: singleProductReducer,
    cart: cartReducer,
    user: userReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
