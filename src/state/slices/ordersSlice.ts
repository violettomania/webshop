import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import { Order, fetchOrders } from '../actions/fetchOrders';

// TODO: this needs to be renamed and possibly moved to @types

interface OrdersState {
  orders: Order[];
  total: number;
  loading: boolean;
  error?: string;
}

const initialState: OrdersState = {
  orders: [],
  total: 0,
  loading: false,
  error: '',
};

// TODO: naming: paged?
// TODO: implement pagination
// TODO: handle errors in all slices
export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        console.log('payload', action.payload);
        state.orders = action.payload.data;
        state.total = action.payload.meta.pagination.total;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const selectProducts = (state: RootState) => state.orders;

export default ordersSlice.reducer;
