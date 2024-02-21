import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import { Order, fetchOrders } from '../actions/fetchOrders';
import { OrderPlacementResponse, sendOrder } from '../actions/sendOrder';

// TODO: this needs to be renamed and possibly moved to @types
interface OrdersState {
  orders: Order[];
  pageCount: number;
  total: number;
  currentPage: number;
  loading: boolean;
  error?: string;
  placedOrder?: OrderPlacementResponse;
}

const initialState: OrdersState = {
  orders: [],
  pageCount: 0,
  total: 0,
  currentPage: 1,
  loading: false,
  error: '',
  placedOrder: undefined,
};

// TODO: naming: paged?
export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload.data;
        state.pageCount = action.payload.meta.pagination.pageCount;
        state.total = action.payload.meta.pagination.total;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(sendOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.placedOrder = action.payload;
        state.loading = false;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const selectProducts = (state: RootState) => state.orders;
export const setPage = ordersSlice.actions.setPage;

export default ordersSlice.reducer;
