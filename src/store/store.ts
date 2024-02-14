import { configureStore } from '@reduxjs/toolkit';
import { Middleware } from '@reduxjs/toolkit';
import productsReducer from '../slices/productsSlice';
import featuredProductsReducer from '../slices/featuredProductsSlice';
import singleProductReducer from '../slices/singleProductSlice';
import cartReducer from '../slices/cartSlice';
import userReducer from '../slices/userSlice';

// TODO: create middleware.ts
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

const localStorageMiddleware: Middleware = (storeApi) => (next) => (action) => {
  let result = next(action);
  if (action.type === 'user/logoutUser') {
    localStorage.removeItem('user');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('totals');
    storeApi.dispatch({ type: 'cart/clearCart' });
  } else {
    console.log('localStorageMiddleware', storeApi.getState());
    localStorage.setItem(
      'user',
      JSON.stringify(storeApi.getState().user.registeredUser)
    );
    localStorage.setItem(
      'cartItems',
      JSON.stringify(storeApi.getState().cart.cartItems)
    );
    localStorage.setItem(
      'totals',
      JSON.stringify(storeApi.getState().cart.totals)
    );
  }
  return result;
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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
