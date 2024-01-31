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
// NOTE: when navigating to http://localhost:3000/products/19, the fetch happens, but the data doesn't reach the Product component. same for ProductPage.
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
        const p = { id, title, company, description, image, price, colors };
        console.log('p', p);
        return p;
        // return { id, title, company, description, image, price, colors };
      } else {
        return {};
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
