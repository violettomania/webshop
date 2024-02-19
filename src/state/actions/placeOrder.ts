import { createAsyncThunk } from '@reduxjs/toolkit';
import { config } from './config/config';

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

const url = config.ordersUrl;

export const placeOrder = createAsyncThunk(
  'checkout/placeOrder',
  async (order: OrderPlacement) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${order.token}`,
        },
        body: JSON.stringify(order.payload),
      });
      const resp = await response.json();
      console.log('placed order', resp);
      return resp;
    } catch (error) {
      throw error;
    }
  }
);
