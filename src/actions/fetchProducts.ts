import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('items/fetchItems', async () => {
  return {};
});
