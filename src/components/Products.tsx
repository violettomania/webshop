import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchProducts } from '../actions/fetchProducts';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import ProductsFilter from './ProductsFilter';
import ProductCard from './ProductCard';
import Loading from './Loading';
import { ProductCardType } from '../slices/featuredProductsSlice';
import ProductsLayoutToggle from './ProductsLayoutToggle';
import Pagination, {
  getPageFromLocalStorage,
  setPageToLocalStorage,
} from './Pagination';

const gridDisplayClasses = 'pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3';
const listDisplayClasses = 'mt-12 grid gap-y-8';
const listCardDisplayClasses =
  'p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap  bg-base-100 shadow-xl hover:shadow-2xl duration-300 group';
const gridCardDisplayClasses =
  'card w-full shadow-xl hover:shadow-2xl transition duration-300';

export default function Products() {
  const dispatch = useAppDispatch();

  const pagedProducts = useAppSelector(
    (state: RootState) => state.paginated.products
  );
  const pageCount = useAppSelector(
    (state: RootState) => state.paginated.pageCount
  );
  const loading = useAppSelector((state: RootState) => state.paginated.loading);

  // TODO: reset page in local storage when user leaves the page
  const [displayMode, setDisplayMode] = useState<DisplayMode>('grid'); // TODO: good candidate for Context API / hook / signal
  const [currentPage, setCurrentPage] = useState(
    getPageFromLocalStorage() || 1
  );

  const location = useLocation();

  // TODO: consider not using local storage for this
  useEffect(() => {
    setPageToLocalStorage(1);
  }, [location]);

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [dispatch, currentPage]);

  const handlePageNumberChange = (event: React.MouseEvent, page: number) => {
    event.preventDefault();
    setCurrentPage(page);
    dispatch(fetchProducts(page));
  };

  const handleLayoutToggle = (
    event: React.MouseEvent,
    display: DisplayMode
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setDisplayMode(display);
  };

  // TODO: add pagination component
  // TODO: pagination: add ... ?
  return loading ? (
    <Loading />
  ) : (
    <section className='align-element py-20'>
      <ProductsFilter />
      <ProductsLayoutToggle
        productQuantity={pagedProducts.length}
        onLayoutToggle={handleLayoutToggle}
        currentDisplayMode={displayMode}
      />
      <div>
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
      </div>
      {pagedProducts.length > 0 && (
        <Pagination
          pageCount={pageCount}
          onPageNumberChange={handlePageNumberChange}
        />
      )}
    </section>
  );
}
