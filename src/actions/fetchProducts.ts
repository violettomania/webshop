import { createAsyncThunk } from '@reduxjs/toolkit';

interface FeaturedProduct {
  id: string;
  attributes: {
    title: string;
    image: string;
    price: string;
  };
}

const url = 'https://strapi-store-server.onrender.com/api/products';
const featuredQuery = '?featured=true';

// example urls
// const featuredItemsUrl =
//   'https://strapi-store-server.onrender.com/api/products?featured=true';
// const itemsUrl = 'https://strapi-store-server.onrender.com/api/products';
// const itemUrl = 'https://strapi-store-server.onrender.com/api/products/12';

// TODO: add 'attributes' deconsctructing
// TODO: add price formatting
// TODO: add error handling
export const fetchFeaturedProducts = createAsyncThunk(
  'items/fetchFeaturedProducts',
  async () => {
    const response = await fetch(`${url}${featuredQuery}`);
    const data = await response.json();
    const { products } = data;
    if (products) {
      return products.map((product: FeaturedProduct) => {
        const { id, attributes } = product;
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

export const fetchProducts = createAsyncThunk('items/fetchItems', async () => {
  return {};
});

export const fetchProduct = createAsyncThunk('items/fetchItem', async () => {
  return {};
});

// TODO: rewrite to axios
// TODO: separate files for fetch single item and fetch items
