import { createSlice } from '@reduxjs/toolkit';

import { fetchProducts } from '../actions/fetchProducts';
import type { RootState } from '../store/store';

interface FeaturedProductType {
  id: string;
  title: string;
  image: string;
  price: string;
}

interface ProductsState {
  products: FeaturedProductType[];
  pageCount: number;
  total: number;
  currentPage: number;
  categories: string[];
  companies: string[];
  loading: boolean;
  error?: string;
  url?: string;
  refresh: boolean;
  layout: DisplayMode;
}

const initialState: ProductsState = {
  products: [],
  pageCount: 0,
  total: 0,
  currentPage: 1,
  categories: [],
  companies: [],
  loading: false,
  error: '',
  url: '',
  refresh: false,
  layout: 'grid',
};

export const productsSlice = createSlice({
  name: 'pagedProducts',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    refreshProductsPage: (state, action) => {
      state.refresh = action.payload;
    },
    setLayout: (state, action) => {
      state.layout = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.pageCount = action.payload.pageCount;
        state.total = action.payload.total;
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
export const setLayout = productsSlice.actions.setLayout;

export default productsSlice.reducer;
