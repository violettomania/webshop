import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooksWrapper';
import { fetchProducts } from '../state/actions/fetchProducts';
import { refreshProductsPage, setPage } from '../state/slices/productsSlice';
import { RootState } from '../state/store/store';

import Pagination from './Pagination';
import Products from './Products';
import ProductsFilter from './ProductsFilter';
import ProductsLayoutToggle from './ProductsLayoutToggle';

export default function ProductsContainer() {
  const dispatch = useAppDispatch();
  const total = useAppSelector((state: RootState) => state.paged.total);
  const categories = useAppSelector(
    (state: RootState) => state.paged.categories
  );
  const companies = useAppSelector((state: RootState) => state.paged.companies);
  const refresh = useAppSelector((state: RootState) => state.paged.refresh);
  const error = useAppSelector((state: RootState) => state.paged.error);

  const [lastSearchParams, setLastSearchParams] = useState<URLParams | null>(
    null
  );

  useEffect(() => {
    if (refresh) {
      dispatch(fetchProducts({ page: 1 }));
      dispatch(refreshProductsPage(false));
    } else {
      dispatch(fetchProducts({ page: 1 }));
    }
    dispatch(setPage(1));
    setLastSearchParams(null);
  }, [dispatch, refresh]);

  useEffect(() => {
    if (error) toast.error('There was an error fetching the products');
  }, [error]);

  const handleSearch = (urlParams: URLParams) => {
    setLastSearchParams(urlParams);
    dispatch(fetchProducts(urlParams));
  };

  const handleReset = () => {
    dispatch(fetchProducts({ page: 1 }));
  };

  const handlePageNumberChange = (page: number) => {
    if (lastSearchParams) {
      dispatch(fetchProducts({ ...lastSearchParams, page }));
    } else {
      dispatch(fetchProducts({ page }));
    }
  };

  return (
    <section className='align-element py-20'>
      <ProductsFilter
        onSearch={handleSearch}
        onReset={handleReset}
        categories={categories}
        companies={companies}
      />
      <ProductsLayoutToggle productQuantity={total} />
      <Products />
      <Pagination onPageNumberChange={handlePageNumberChange} />
    </section>
  );
}
