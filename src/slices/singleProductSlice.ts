import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import { fetchFeaturedProducts } from '../actions/fetchFeaturedProducts';

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
      .addCase(fetchFeaturedProducts.pending, (state) => {
        console.log('pending');
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
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        console.log('action.payload', action.payload);
        state.product = action.payload;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        console.log('rejected');
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
