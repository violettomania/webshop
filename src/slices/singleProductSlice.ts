import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import { fetchProduct } from '../actions/fetchProduct';

interface SingleProduct {
  id: string;
  title: string;
  company: string;
  description: string;
  image: string;
  price: string;
  colors: string[];
}

interface SingleProductState {
  product: SingleProduct;
  loading: boolean;
  error?: string;
}

const initialState: SingleProductState = {
  product: {
    id: '',
    title: '',
    company: '',
    description: '',
    image: '',
    price: '',
    colors: [],
  },
  loading: false,
  error: '',
};

// TODO: add loading state
export const singleProductSlice = createSlice({
  name: 'single',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const selectSingleProduct = (state: RootState) => state.single.product;

export default singleProductSlice.reducer;
