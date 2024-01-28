import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const setSearchTerm = createAction<string>('');

const url = 'https://strapi-store-server.onrender.com/api/products';

// examples urls
// const featuredItemsUrl =
//   'https://strapi-store-server.onrender.com/api/products?featured=true';
// const itemsUrl = 'https://strapi-store-server.onrender.com/api/products';
// const itemUrl = 'https://strapi-store-server.onrender.com/api/products/12';

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (searchTerm: string) => {
    return {};
  }
);

export const fetchItem = createAsyncThunk(
  'items/fetchItem',
  async (searchTerm: string) => {
    return {};
  }
);

// TODO: rewrite to axios
// TODO: separate files for fetch single item and fetch items
