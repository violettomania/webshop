import { createAsyncThunk } from '@reduxjs/toolkit';
import { config } from './config/config';

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

export interface URLParams {
  search?: string;
  category?: string;
  company?: string;
  order?: string;
  price?: number;
  shipping?: boolean;
  page?: number;
}

const url = config.productsUrl;

const buildSearchQuery = (params: URLParams) => {
  const search = params.search ? `search=${params.search}` : '';
  const category = params.category ? `category=${params.category}` : '';
  const company = params.company ? `company=${params.company}` : '';
  const order = params.order ? `order=${params.order}` : '';
  const price = params.price ? `price=${params.price}` : '';
  const shipping = params.shipping ? 'shipping=on' : '';
  const page = params.page ? `page=${params.page}` : '';
  const queryParams = [search, category, company, order, price, shipping, page];
  const queryString = queryParams.filter((param) => param).join('&');
  return `?${queryString}`;
};

// TODO: enforce type
// TODO: stricter types for categories etc.
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (urlParams: URLParams) => {
    try {
      const params = buildSearchQuery(urlParams);
      const fullUrl = `${url}${params}`;
      const response = await fetch(fullUrl);
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
