import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProduct = createAsyncThunk('items/fetchItem', async () => {
  return {};
});
