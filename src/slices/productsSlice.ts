import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import { fetchProducts } from '../actions/fetchProducts';

// TODO: this needs to be renamed and possibly moved to @types
export interface FeaturedProductType {
  id: string;
  title: string;
  image: string;
  price: string;
}

interface ProductsState {
  products: FeaturedProductType[];
  loading: boolean;
  error?: string;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: '',
};

// TODO: rename paginated to paged
export const allProductsSlice = createSlice({
  name: 'paginated',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const selectAllProducts = (state: RootState) => state.paginated.products;

export default allProductsSlice.reducer;
