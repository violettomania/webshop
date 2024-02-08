import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { URLParams, fetchProducts } from '../actions/fetchProducts';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import ProductsFilter from './ProductsFilter';
import ProductCard from './ProductCard';
import Loading from './Loading';
import { ProductCardType } from '../slices/featuredProductsSlice';
import ProductsLayoutToggle from './ProductsLayoutToggle';
import Pagination from './Pagination';
import { setPage } from '../slices/productsSlice';

const gridDisplayClasses = 'pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3';
const listDisplayClasses = 'mt-12 grid gap-y-8';
const listCardDisplayClasses =
  'p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap  bg-base-100 shadow-xl hover:shadow-2xl duration-300 group';
const gridCardDisplayClasses =
  'card w-full shadow-xl hover:shadow-2xl transition duration-300';

// TODO: rename to ProductsContainer, add Products component
export default function Products() {
  const dispatch = useAppDispatch();

  // TODO: rename to allProducts?
  const pagedProducts = useAppSelector(
    (state: RootState) => state.paged.products
  );
  const total = useAppSelector((state: RootState) => state.paged.total);
  const loading = useAppSelector((state: RootState) => state.paged.loading);
  const categories = useAppSelector(
    (state: RootState) => state.paged.categories
  );
  const companies = useAppSelector((state: RootState) => state.paged.companies);
  const url = useAppSelector((state: RootState) => state.paged.url);

  // TODO: bugfix: page sometimes loads twice, page never resets
  // TODO: reset page in local storage when user leaves the page
  const [displayMode, setDisplayMode] = useState<DisplayMode>('grid'); // TODO: good candidate for Context API / hook / signal
  // TODO: it's used in Pagination, consider moving it to a hook
  const [lastSearch, setLastSearch] = useState<URLParams | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // TODO: bugfix: it's not working when navigating back
  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [location]);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1 }));
    dispatch(setPage(1));
    setLastSearch(null);
  }, [dispatch]);

  useEffect(() => {
    if (url) navigate(url);
  }, [navigate, url]);

  const handleSearch = (urlParams: URLParams) => {
    setLastSearch(urlParams);
    dispatch(fetchProducts(urlParams));
  };

  const handleReset = () => {
    dispatch(fetchProducts({ page: 1 }));
  };

  const handlePageNumberChange = (page: number) => {
    if (lastSearch) {
      dispatch(fetchProducts({...lastSearch, page}));
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

  useEffect(() => {console.log(location.pathname) }, [location.pathname]);

  // TODO: pagination: add ... ?
  return loading ? (
    <Loading />
  ) : (
    <section className='align-element py-20'>
      <ProductsFilter
        onSearch={handleSearch}
        onReset={handleReset}
        categories={categories}
        companies={companies}
        key={location.pathname}
      />
      <ProductsLayoutToggle
        productQuantity={total}
        onLayoutToggle={handleLayoutToggle}
        currentDisplayMode={displayMode}
      />
      <div>
        {pagedProducts.length === 0 ? (
          <h5 className='text-2xl mt-16'>
            Sorry, no products matched your search...
          </h5>
        ) : (
          <div // TODO: bug: when changing to card, and navigating back, the grid/list selector defaults to grid
            className={`${
              displayMode === 'grid' ? gridDisplayClasses : listDisplayClasses
            }`}
          >
            {pagedProducts.map((product: ProductCardType) => (
              <ProductCard
                key={product.id}
                classes={`${
                  displayMode === 'grid'
                    ? gridCardDisplayClasses
                    : listCardDisplayClasses
                }`}
                {...product}
              />
            ))}
          </div>
        )}
      </div>
      <Pagination
        onPageNumberChange={handlePageNumberChange}
      />
    </section>
  );
}
