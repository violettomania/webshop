import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { config } from './config/config';

interface FeaturedProduct {
  id: string;
  attributes: {
    title: string;
    image: string;
    price: string;
  };
}

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeaturedProducts',
  async () => {
    const response = await axios.get(
      `${config.productsUrl}${config.featuredQuery}`
    );
    const products = response.data.data || [];

    return products.map(
      ({ id, attributes: { title, image, price } }: FeaturedProduct) => ({
        id,
        title,
        image,
        price,
      })
    );
  }
);
