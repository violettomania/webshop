import { Middleware } from '@reduxjs/toolkit';

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
      storeApi.dispatch({ type: 'cart/clearCart' });
    } else {
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
