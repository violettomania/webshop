import { createAsyncThunk } from '@reduxjs/toolkit';
import { config } from './config/config';
import axios from 'axios';

export interface CartItem {
  cartID: string;
  productID: number;
  image: string;
  title: string;
  price: string;
  company: string;
  productColor: string;
  amount: number;
}

export interface OrderPlacement {
  payload: {
    data: {
      name: string;
      address: string;
      chargeTotal: number;
      orderTotal: string;
      cartItems: CartItem[];
      numItemsInCart: number;
    };
  };
  token: string;
}

export interface OrderPlacementResponse {
  id: number;
  address: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
  orderTotal: string;
  cartItems: CartItem[];
  numItemsInCart: number;
}

export const sendOrder = createAsyncThunk(
  'checkout/sendOrder',
  async (order: OrderPlacement) => {
    try {
      const { data } = await axios.post(config.ordersUrl, order.payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${order.token}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
);
