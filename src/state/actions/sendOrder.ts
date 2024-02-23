import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

import { config } from './config/config';

export const sendOrder = createAsyncThunk(
  'checkout/sendOrder',
  async (order: OrderPlacement) => {
    try {
      const token = Cookies.get('token');
      const { data } = await axios.post(config.ordersUrl, order.payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
);
