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
};

// TODO: add loading state
export const singleProductSlice = createSlice({
  name: 'single',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.product = {
          id: '',
          title: '',
          company: '',
          description: '',
          image: '',
          price: '',
          colors: [],
        };
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.product = {
          id: '',
          title: '',
          company: '',
          description: '',
          image: '',
          price: '',
          colors: [],
        };
      });
  },
});

export const selectSingleProduct = (state: RootState) => state.single.product;

export default singleProductSlice.reducer;
