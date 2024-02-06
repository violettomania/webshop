import { createAsyncThunk } from '@reduxjs/toolkit';

// TODO: make this a generic type?
// TODO: replace FeatureProductProps
interface SingleProduct {
  id: string;
  attributes: {
    title: string;
    image: string;
    price: string;
  };
}

export interface SearchParams {
  search: string;
  category: string;
  company: string;
  order: string;
  price: number;
  shipping: boolean;
}

// TODO: move this to a config file
const url = 'https://strapi-store-server.onrender.com/api/products';

// TODO: enforce type
// TODO: stricter types for categories etc.
export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async ({
    search,
    category,
    company,
    order,
    price,
    shipping,
  }: SearchParams) => {
    try {
      const response = await fetch(
        `${url}?search=${search}&category=${category}&company=${company}&order=${order}&price=${price}&shipping=${
          shipping ? 'on' : ''
        }`
      );
      const data = await response.json();
      const { data: products, meta } = data;
      let productsArray = [];
      if (products) {
        productsArray = products.map((product: SingleProduct) => {
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
        const pageCount = meta.pagination.pageCount;
        const total = meta.pagination.total;
        const categories = meta.categories;
        const companies = meta.companies;
        return {
          products: productsArray,
          pageCount,
          total,
          categories,
          companies,
        };
      } else {
        return {
          products: [],
          pageCount: 0,
          total: 0,
          categories: [],
          companies: [],
        };
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// TODO: rewrite to axios
