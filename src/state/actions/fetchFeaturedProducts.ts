import { createAsyncThunk } from '@reduxjs/toolkit';
import { config } from './config/config';

// TODO: make this a generic type?
// TODO: replace FeatureProductProps
interface FeaturedProduct {
  id: string;
  attributes: {
    title: string;
    image: string;
    price: string;
  };
}

const url = config.productsUrl;
const featuredQuery = config.featuredQuery;

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeaturedProducts',
  async () => {
    try {
      const response = await fetch(`${url}${featuredQuery}`);
      const data = await response.json();
      const { data: products } = data;
      if (products) {
        return products.map((product: FeaturedProduct) => {
          const {
            id,
            attributes: { title, image, price },
          } = product;
          return {
            id: id,
            title: title,
            image: image,
            price: price,
          };
        });
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// TODO: rewrite to axios
