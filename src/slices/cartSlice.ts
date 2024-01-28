import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';

interface CartState {
  items: string[];
}

const initialState: CartState = {
  items: [''],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    test: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { test } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
