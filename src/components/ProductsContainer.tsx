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
  const [displayMode, setDisplayMode] = useState<DisplayMode>('grid'); // TODO: good candidate for Context API / hook / signal
  const [lastSearchParams, setLastSearchParams] = useState<URLParams | null>(
    null
  );

  const location = useLocation();
  const navigate = useNavigate();

  // TODO: bugfix: it's not working when navigating back
  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [location]);

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

  // TODO: find a better way to handle this
  // useEffect(() => {
  //   const urlParams = new URLurlParams(location.search);
  //   const search = urlParams.get('search');
  //   const category = urlParams.get('category');
  //   const company = urlParams.get('company');
  //   const order = urlParams.get('order');
  //   const price = urlParams.get('price');
  //   const shipping = urlParams.get('shipping');
  //   const page = urlParams.get('page');

  //   const params: urlParams = {
  //     search: search || '',
  //     category: category || 'all',
  //     company: company || 'all',
  //     order: order || 'a-z',
  //     price: Number(price) || 100000,
  //     shipping: 'on' === shipping,
  //     page: Number(page) || 1,
  //   };

  //   dispatch(fetchProducts(params));
  // }, [dispatch, location.search]);

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
