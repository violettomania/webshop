import { createAsyncThunk } from '@reduxjs/toolkit';
import { config } from './config/config';

export interface Order {
  id: string;
  attributes: {
    address: string;
    createdAt: string;
    name: string;
    orderTotal: string;
    numItemsInCart: number;
  };
}

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

const url = config.ordersUrl;

// TODO: simplify fetch
// TODO: fetch cleanup
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (urlParams: URLParams) => {
    try {
      const { token, page } = urlParams;
      const pageParam = page ? `?page=${page}` : '';
      const fullUrl = `${url}${pageParam}`;
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const resp: OrdersResponse = await response.json();
      return resp;
    } catch (error) {
      throw error;
    }
  }
);
