import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { config } from './config/config';

interface OrdersResponse {
  data: Order[];
  meta: {
    pagination: {
      pageCount: number;
      total: number;
    };
  };
}

interface URLParams {
  token: string;
  page?: number;
}

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async ({ token, page }: URLParams) => {
    const pageParam = page ? `?page=${page}` : '';
    const response = await axios.get(`${config.ordersUrl}${pageParam}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as OrdersResponse;
  }
);
