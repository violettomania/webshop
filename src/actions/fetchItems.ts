import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const setSearchTerm = createAction<string>('');

const url = 'https://strapi-store-server.onrender.com/api/products';
const featuredQuery = '?featured=true';

// example urls
// const featuredItemsUrl =
//   'https://strapi-store-server.onrender.com/api/products?featured=true';
// const itemsUrl = 'https://strapi-store-server.onrender.com/api/products';
// const itemUrl = 'https://strapi-store-server.onrender.com/api/products/12';

// TODO: add 'attributes' deconsctructing
// TODO: add price formatting
export const fetchFeaturedItems = createAsyncThunk(
  'items/fetchItem',
  async () => {
    const response = await fetch(`${url}${featuredQuery}`);
    const data = await response.json();
    const { items } = data;
    if (items) {
      return items.map((item: FeaturedItem) => {
        const { id, attributes } = item;
        return {
          id: id,
          title: attributes.title,
          image: attributes.image,
          price: attributes.price,
        };
      });
    } else {
      return [];
    }
  }
);

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
