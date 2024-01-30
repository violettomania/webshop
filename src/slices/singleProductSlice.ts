import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import { fetchFeaturedProducts } from '../actions/fetchFeaturedProducts';
import { FeaturedProductProps } from '../components/FeaturedProduct';

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
export const cartSlice = createSlice({
  name: 'single',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedProducts.pending, (state) => {
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
        state.product = action.payload;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
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

export const selectCart = (state: RootState) => state.single.product;

export default cartSlice.reducer;
