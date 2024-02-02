import { createAsyncThunk } from '@reduxjs/toolkit';

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

// TODO: move this to a config file
const url = 'https://strapi-store-server.onrender.com/api/products';
const featuredQuery = '?featured=true';

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
