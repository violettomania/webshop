import { createAsyncThunk } from '@reduxjs/toolkit';
import { get } from 'http';

//       const params = `?search=${search}&category=${category}&company=${company}&order=${order}&price=${price}&shipping=${
//         shipping ? 'on' : ''
//       }&page=${page ? page : ''}`;

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
  search?: string;
  category?: string;
  company?: string;
  order?: string;
  price?: number;
  shipping?: boolean;
  page?: number;
}

// TODO: move this to a config file
const url = 'https://strapi-store-server.onrender.com/api/products';

const buildSearchQuery = (params: SearchParams) => {
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

const hasPageOnly = (params: SearchParams) => {
  const { search, category, company, order, price, shipping, page } = params;

  if (
    !search &&
    !category &&
    !company &&
    !order &&
    !price &&
    !shipping &&
    page
  ) {
    return true;
  }

  return false;
};

// TODO: enforce type
// TODO: stricter types for categories etc.
export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (searchParams: SearchParams) => {
    // TODO: remove this
    // TODO: do we need to check for page only?
    const params = buildSearchQuery(searchParams);
    try {
      let fullUrl = '';
      if (hasPageOnly(searchParams)) {
        const { page } = searchParams;
        fullUrl = `${url}?page=${page}`;
      } else {
        const params = buildSearchQuery(searchParams);
        fullUrl = `${url}${params}`;
      }
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
          url: params,
        };
      } else {
        return {
          products: [],
          pageCount: 0,
          total: 0,
          categories: [],
          companies: [],
          url: '',
        };
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// TODO: rewrite to axios
