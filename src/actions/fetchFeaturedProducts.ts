import { createAsyncThunk } from '@reduxjs/toolkit';

// TODO: make this a generic type
// TODO: replace FeatureProductProps
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

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeaturedProducts',
  async () => {
    try {
      const response = await fetch(`${url}${featuredQuery}`);
      const data = await response.json();
      const { data: products } = data;
      if (products) {
        return products.map((product: FeaturedProduct) => {
          const {
            id,
            attributes: { title, image, price },
          } = product;
          return {
            id: id,
            title: title,
            image: image,
            price: price,
          };
        });
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// TODO: rewrite to axios
