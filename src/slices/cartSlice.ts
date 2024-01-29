import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import { fetchFeaturedProducts } from '../actions/fetchFeaturedProducts';
import { FeaturedProductProps } from '../components/FeaturedProduct';

interface CartState {
  products: FeaturedProductProps[];
}

const initialState: CartState = {
  products: [],
};

// TODO: add loading state
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    test: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.products = [];
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.products = [];
      });
  },
});

export const { test } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.products;

export default cartSlice.reducer;
