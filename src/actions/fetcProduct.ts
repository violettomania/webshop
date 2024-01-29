import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProduct = createAsyncThunk('products/fetchItem', async () => {
  return {};
});
