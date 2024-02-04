import { createAsyncThunk } from '@reduxjs/toolkit';

// TODO: make this a generic type?
// TODO: replace FeatureProductProps
interface SingleProduct {
  id: string;
  attributes: {
    title: string;
    image: string;
    price: string;
  };
}

// TODO: move this to a config file
const url = 'https://strapi-store-server.onrender.com/api/products';
const page = '?page=1';

// TODO: enforce type
export const fetchProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    try {
      const response = await fetch(url + page);
      const data = await response.json();
      const { data: products } = data;
      if (products) {
        return products.map((product: SingleProduct) => {
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
