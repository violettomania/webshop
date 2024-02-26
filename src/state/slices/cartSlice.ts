import { createSlice } from '@reduxjs/toolkit';

interface CartState {
  cartItems: CartItem[];
  totals: CartTotals;
}

const initialState: CartState = {
  cartItems: [],
  totals: {
    cartTotal: 0,
    numItemsInCart: 0,
    orderTotal: 0,
    shipping: 0,
    tax: 0,
  },
};

const calculateTotals = (state: CartState) => {
  let cartTotal = 0;
  let numItemsInCart = 0;
  state.cartItems.forEach((item) => {
    cartTotal += item.amount * parseFloat(item.price);
    numItemsInCart += item.amount;
  });
  const shipping = cartTotal > 100 ? 0 : 10;
  const tax = cartTotal * 0.1;
  const orderTotal = cartTotal + shipping + tax;
  state.totals = {
    cartTotal: parseFloat(cartTotal.toFixed(2)),
    numItemsInCart,
    orderTotal: parseFloat(orderTotal.toFixed(2)),
    shipping,
    tax: parseFloat(tax.toFixed(2)),
  };
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItems = state.cartItems.find(
        (item) => item.productID === newItem.productID
      );

      if (existingItems) {
        existingItems.amount += 1;
      } else {
        state.cartItems.push(newItem);
      }

      calculateTotals(state);
    },
    changeAmountInCart: (state, action) => {
      const { productID, amount } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productID === productID
      );

      if (existingItem && amount > 0) {
        existingItem.amount = amount;
      }

      calculateTotals(state);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productID === id
      );

      if (existingItem) {
        existingItem.amount = 0;
        state.cartItems = state.cartItems.filter(
          (item) => item.productID !== id
        );
      }

      calculateTotals(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totals = { ...initialState.totals };
    },
  },
});

export const { addToCart, changeAmountInCart, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
