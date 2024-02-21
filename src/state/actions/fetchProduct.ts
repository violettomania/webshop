import { createAsyncThunk } from '@reduxjs/toolkit';
import { config } from './config/config';
import axios from 'axios';

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (productId: string) => {
    const response = await axios.get(`${config.productsUrl}/${productId}`);
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
