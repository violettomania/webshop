import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { config } from './config/config';

interface SingleProduct {
  id: string;
  attributes: {
    title: string;
    image: string;
    price: string;
  };
}

const buildSearchQuery = (params: URLParams) => {
  const queryParams = Object.entries(params)
    .map(([key, value]) => value && `${key}=${value}`)
    .filter(Boolean)
    .join('&');
  return `?${queryParams}`;
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (urlParams: URLParams) => {
    const params = buildSearchQuery(urlParams);
    const fullUrl = `${config.productsUrl}${params}`;
    const { data: products, meta } = (await axios.get(fullUrl)).data;
    const productsArray =
      products?.map(
        ({ id, attributes: { title, image, price } }: SingleProduct) => ({
          id,
          title,
          image,
          price,
        })
      ) || [];
    const {
      pagination: { pageCount = 0, total = 0 } = {},
      categories = [],
      companies = [],
    } = meta || {};
    return {
      products: productsArray,
      pageCount,
      total,
      categories,
      companies,
    };
  }
);
