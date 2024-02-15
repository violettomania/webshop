import { createAsyncThunk } from '@reduxjs/toolkit';
import { config } from './config/config';

export interface URLParams {
    search?: string;
    category?: string;
    company?: string;
    order?: string;
    price?: number;
    shipping?: boolean;
    page?: number;
}

const url = config.ordersUrl;

// TODO: simplify fetch
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
            const resp = await response.json();
            return resp;
        } catch (error) {
            throw error;
        }
    }
);

