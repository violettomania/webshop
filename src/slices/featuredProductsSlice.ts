import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import { fetchFeaturedProducts } from '../actions/fetchFeaturedProducts';
import { FeaturedProductProps } from '../components/FeaturedProduct';

interface FeaturedProductState {
  products: FeaturedProductProps[];
}

const initialState: FeaturedProductState = {
  products: [],
};

// TODO: add loading state
export const cartSlice = createSlice({
  name: 'featured',
  initialState,
  reducers: {},
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

export const selectCart = (state: RootState) => state.featured.products;

export default cartSlice.reducer;
