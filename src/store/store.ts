import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../slices/productsSlice';
import featuredProductsReducer from '../slices/featuredProductsSlice';
import singleProductReducer from '../slices/singleProductSlice';
import cartReducer from '../slices/cartSlice';
import userReducer from '../slices/userSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const savedCartItems = localStorage.getItem('cartItems');
const savedTotals = localStorage.getItem('totals');

let totals = savedTotals ? JSON.parse(savedTotals) : null;
if (
  Array.isArray(totals) ||
  !totals ||
  !(
    'cartTotal' in totals &&
    'numItemsInCart' in totals &&
    'orderTotal' in totals &&
    'shipping' in totals &&
    'tax' in totals
  )
) {
  totals = {
    cartTotal: 0,
    numItemsInCart: 0,
    orderTotal: 0,
    shipping: 0,
    tax: 0,
  };
}

const preloadedState = savedCartItems
  ? {
      cart: {
        cartItems: JSON.parse(savedCartItems),
        totals: totals,
      },
    }
  : {
      cart: {
        cartItems: [],
        totals: totals,
      },
    };

const store = configureStore({
  reducer: {
    paged: productsReducer,
    featured: featuredProductsReducer,
    single: singleProductReducer,
    cart: cartReducer,
    user: userReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

store.subscribe(() => {
  localStorage.setItem(
    'cartItems',
    JSON.stringify(store.getState().cart.cartItems)
  );
  localStorage.setItem('totals', JSON.stringify(store.getState().cart.totals));
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
