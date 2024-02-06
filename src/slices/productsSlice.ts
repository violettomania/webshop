import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import { fetchProducts } from '../actions/fetchProducts';
import { searchProducts } from '../actions/searchProducts';

// TODO: this needs to be renamed and possibly moved to @types
export interface FeaturedProductType {
  id: string;
  title: string;
  image: string;
  price: string;
}

interface ProductsState {
  products: FeaturedProductType[];
  total: number;
  pageCount: number;
  loading: boolean;
  error?: string;
}

const initialState: ProductsState = {
  products: [],
  total: 0,
  pageCount: 0,
  loading: false,
  error: '',
};

// TODO: rename paginated to paged
export const allProductsSlice = createSlice({
  name: 'paged',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.pageCount = action.payload.pageCount;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.pageCount = action.payload.pageCount;
        state.loading = false;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const selectAllProducts = (state: RootState) => state.paged.products;

export default allProductsSlice.reducer;
