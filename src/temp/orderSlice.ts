import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import { fetchOrders } from '../actions/fetchOrders';

// TODO: this needs to be renamed and possibly moved to @types
export interface Order {
    name: string;
    address: string;
    products: number;
    cost: number;
}

interface OrdersState {
    orders: Order[];
    loading: boolean;
    error?: string;
}

const initialState: OrdersState = {
    orders: [],
    loading: false,
    error: '',
};

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
                state.orders = action.payload.orders;
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
