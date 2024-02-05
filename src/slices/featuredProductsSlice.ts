import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import { fetchFeaturedProducts } from '../actions/fetchFeaturedProducts';

// TODO: this needs to be renamed and possibly moved to @types
export interface ProductCardType {
  id: string;
  title: string;
  image: string;
  price: string;
  classes?: string;
}

interface FeaturedProductState {
  products: ProductCardType[];
  loading: boolean;
  error?: string;
}

const initialState: FeaturedProductState = {
  products: [],
  loading: false,
  error: '',
};

export const featuredProductSlice = createSlice({
  name: 'featured',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const selectFeaturedProducts = (state: RootState) =>
  state.featured.products;

export default featuredProductSlice.reducer;
