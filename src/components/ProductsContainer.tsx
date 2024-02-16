import { useEffect, useState } from 'react';
import { URLParams, fetchProducts } from '../state/actions/fetchProducts';
import { RootState } from '../state/store/store';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { toast } from 'react-toastify';
import ProductsFilter from './ProductsFilter';
import Products from './Products';
import ProductsLayoutToggle from './ProductsLayoutToggle';
import Pagination from './Pagination';
import { refreshProductsPage, setPage } from '../state/slices/productsSlice';

export default function ProductsContainer() {
  const dispatch = useAppDispatch();
  const total = useAppSelector((state: RootState) => state.paged.total);
  const categories = useAppSelector(
    (state: RootState) => state.paged.categories
  );
  const companies = useAppSelector((state: RootState) => state.paged.companies);
  const refresh = useAppSelector((state: RootState) => state.paged.refresh);
  const error = useAppSelector((state: RootState) => state.paged.error);

  // TODO: good candidate for Context API / hook / signal
  const [displayMode, setDisplayMode] = useState<DisplayMode>('grid');
  const [lastSearchParams, setLastSearchParams] = useState<URLParams | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchProducts({ page: 1 }));
    dispatch(setPage(1));
    setLastSearchParams(null);
    if (refresh) {
      dispatch(fetchProducts({ page: 1 }));
      dispatch(refreshProductsPage(false));
    }
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

  // TODO: move this to a custom hook
  const handlePageNumberChange = (page: number) => {
    if (lastSearchParams) {
      dispatch(fetchProducts({ ...lastSearchParams, page }));
    } else {
      dispatch(fetchProducts({ page }));
    }
  };

  const handleLayoutToggle = (
    event: React.MouseEvent,
    display: DisplayMode
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setDisplayMode(display);
  };

  // TODO: pagination: add ... ?
  return (
    <section className='align-element py-20'>
      <ProductsFilter
        onSearch={handleSearch}
        onReset={handleReset}
        categories={categories}
        companies={companies}
      />
      <ProductsLayoutToggle
        productQuantity={total}
        onLayoutToggle={handleLayoutToggle}
        currentDisplayMode={displayMode}
      />
      <Products displayMode={displayMode} />
      <Pagination onPageNumberChange={handlePageNumberChange} />
    </section>
  );
}
