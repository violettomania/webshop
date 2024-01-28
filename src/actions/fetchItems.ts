import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const setSearchTerm = createAction<string>('');

const itemsUrl = '';

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (searchTerm: string) => {
    return {};
  }
);

const itemUrl = '';

export const fetchItem = createAsyncThunk(
  'items/fetchItem',
  async (searchTerm: string) => {
    return {};
  }
);

// TODO: rewrite to axios
// TODO: separate files for fetch single item and fetch items
