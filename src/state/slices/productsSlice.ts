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
  total: number;
  pageCount: number;
  currentPage: number;
  categories: string[];
  companies: string[];
  loading: boolean;
  error?: string;
  url?: string;
  refresh: boolean;
}

const initialState: ProductsState = {
  products: [],
  total: 0,
  pageCount: 0,
  currentPage: 1,
  categories: [],
  companies: [],
  loading: false,
  error: '',
  url: '',
  refresh: false,
};

export const productsSlice = createSlice({
  name: 'paged',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    refreshProductsPage: (state, action) => {
      state.refresh = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.pageCount = action.payload.pageCount;
        state.categories = action.payload.categories;
        state.companies = action.payload.companies;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const selectProducts = (state: RootState) => state.paged.products;
export const setPage = productsSlice.actions.setPage;
export const refreshProductsPage = productsSlice.actions.refreshProductsPage;

export default productsSlice.reducer;
