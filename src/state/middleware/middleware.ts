import { Middleware } from '@reduxjs/toolkit';
import { clearCart } from '../slices/cartSlice';
import { setUser } from '../slices/userSlice';

const savedCartItems = localStorage.getItem('cartItems');
const savedTotals = localStorage.getItem('totals');
// const userLoggedIn = useAppSelector(
//   (state: RootState) => state.user.userLoggedIn
// );

// TODO: next: user is logged out on page refresh
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

export const preloadedState = savedCartItems
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

export const localStorageMiddleware: Middleware =
  (storeApi) => (next) => (action) => {
    let result = next(action);
    if (action.type === 'user/logoutUser') {
      localStorage.removeItem('user');
      localStorage.removeItem('cartItems');
      localStorage.removeItem('totals');
      storeApi.dispatch(clearCart());
    } else {
      const state = storeApi.getState();
      if (!state.user.userLoggedIn && localStorage.getItem('user')) {
        storeApi.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
        localStorage.setItem('user', JSON.stringify(state.user.registeredUser));
      }
      if (state.user.registeredUser) {
        localStorage.setItem('user', JSON.stringify(state.user.registeredUser));
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cart.cartItems));
      localStorage.setItem('totals', JSON.stringify(state.cart.totals));
    }
    return result;
  };
