import { createAsyncThunk } from '@reduxjs/toolkit';
import { config } from './config/config';
import axios from 'axios';

// TODO: do I need this?
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

const url = `${config.productsUrl}/`;

// TODO: enforce Product type (above)
export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (productId: string) => {
    const response = await axios.get(`${url}${productId}`);
    const product = response.data.data || {
      id: '',
      title: '',
      company: '',
      description: '',
      image: '',
      price: '',
      colors: [],
    };

    const {
      id,
      attributes: { title, company, description, image, price, colors },
    } = product;

    return { id, title, company, description, image, price, colors };
  }
);
