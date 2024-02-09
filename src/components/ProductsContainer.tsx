import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { URLParams, fetchProducts } from '../actions/fetchProducts';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import ProductsFilter from './ProductsFilter';
import Products from './Products';
import ProductsLayoutToggle from './ProductsLayoutToggle';
import Pagination from './Pagination';
import { setPage } from '../slices/productsSlice';

export default function ProductsContainer() {
  const dispatch = useAppDispatch();
  const total = useAppSelector((state: RootState) => state.paged.total);
  const categories = useAppSelector(
    (state: RootState) => state.paged.categories
  );
  const companies = useAppSelector((state: RootState) => state.paged.companies);
  const url = useAppSelector((state: RootState) => state.paged.url);

  // TODO: bugfix: page sometimes loads twice, page never resets
  // TODO: good candidate for Context API / hook / signal
  const [displayMode, setDisplayMode] = useState<DisplayMode>('grid');
  const [lastSearchParams, setLastSearchParams] = useState<URLParams | null>(
    null
  );

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts({ page: 1 }));
    dispatch(setPage(1));
    setLastSearchParams(null);
  }, [dispatch]);

  useEffect(() => {
    if (url) navigate(url);
  }, [navigate, url]);

  const handleSearch = (urlParams: URLParams) => {
    setLastSearchParams(urlParams);
    dispatch(fetchProducts(urlParams));
  };

  // TODO: do not reload the page when the search is empty
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

  const handleLayoutToggle = (
    event: React.MouseEvent,
    display: DisplayMode
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setDisplayMode(display);
  };

  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);

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
