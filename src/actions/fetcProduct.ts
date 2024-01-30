import { createAsyncThunk } from '@reduxjs/toolkit';

interface Product {
  id: string;
  attributes: {
    title: string;
    company: string;
    description: string;
    image: string;
    price: string;
    colors: string[];
  };
}
const url = 'https://strapi-store-server.onrender.com/api/products/';

// TODO: enforce Product type (above)
export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (id: string) => {
    try {
      const response = await fetch(`${url}${id}`);
      const data = await response.json();
      const { data: product } = data;
      if (product) {
        const {
          id,
          attributes: { title, company, description, image, price, colors },
        } = product;
        return { id, title, company, description, image, price, colors };
      } else {
        return {};
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
