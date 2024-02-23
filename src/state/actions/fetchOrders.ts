import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

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
  page?: number;
}

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async ({ page = undefined }: URLParams) => {
    const token = Cookies.get('token');
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
