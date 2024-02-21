import { createAsyncThunk } from '@reduxjs/toolkit';
import { config } from './config/config';
import axios from 'axios';

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
