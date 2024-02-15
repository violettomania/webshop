import { createAsyncThunk } from '@reduxjs/toolkit';
import { config } from './config/config';

export interface Order {
    id: string;
    attributes: {
        address: string;
        name: string;
        orderTotal: string;
        numItemsInCart: number;
    };
}

interface OrdersResponse {
    data: Order[];
}

const url = config.ordersUrl;

// TODO: simplify fetch
// TODO: fetch cleanup
export const fetchOrders = createAsyncThunk(
    'user/fetchOrders',
    async (token: string) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const resp: OrdersResponse = await response.json();
            return resp.data;
        } catch (error) {
            throw error;
        }
    }
);

