import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchProducts } from '../actions/fetchProducts';
import { SearchParams, searchProducts } from '../actions/searchProducts';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import ProductsFilter from './ProductsFilter';
import ProductCard from './ProductCard';
import Loading from './Loading';
import { ProductCardType } from '../slices/featuredProductsSlice';
import ProductsLayoutToggle from './ProductsLayoutToggle';
import Pagination, { getPageFromLocalStorage } from './Pagination';

const gridDisplayClasses = 'pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3';
const listDisplayClasses = 'mt-12 grid gap-y-8';
const listCardDisplayClasses =
  'p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap  bg-base-100 shadow-xl hover:shadow-2xl duration-300 group';
const gridCardDisplayClasses =
  'card w-full shadow-xl hover:shadow-2xl transition duration-300';

export default function Products() {
  const dispatch = useAppDispatch();

  // TODO: rename to allProducts?
  const pagedProducts = useAppSelector(
    (state: RootState) => state.paged.products
  );
  const pageCount = useAppSelector((state: RootState) => state.paged.pageCount);
  const total = useAppSelector((state: RootState) => state.paged.total);
  const loading = useAppSelector((state: RootState) => state.paged.loading);
  const categories = useAppSelector(
    (state: RootState) => state.paged.categories
  );
  const companies = useAppSelector((state: RootState) => state.paged.companies);

  // TODO: bugfix: page sometimes loads twice, page never resets
  // TODO: reset page in local storage when user leaves the page
  const [displayMode, setDisplayMode] = useState<DisplayMode>('grid'); // TODO: good candidate for Context API / hook / signal
  // TODO: it's used in Pagination, consider moving it to a hook
  const [currentPage, setCurrentPage] = useState(
    getPageFromLocalStorage() || 1
  );

  const location = useLocation();

  // TODO: consider not using local storage for this
  // TODO: bugfix: it's not working when navigating back
  useEffect(() => {
    setCurrentPage(1);
  }, [location]);

  // TODO: probably: have a search state var set by the filter, and use it to decide which action to fire
  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [dispatch, currentPage]);

  const handleSearch = (searchParams: SearchParams) => {
    dispatch(searchProducts(searchParams));
  };

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

  // TODO: pagination: add ... ?
  return loading ? (
    <Loading />
  ) : (
    <section className='align-element py-20'>
      <ProductsFilter
        onSearch={handleSearch}
        categories={categories}
        companies={companies}
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
      {pageCount > 1 && (
        <Pagination
          pageCount={pageCount}
          onPageNumberChange={handlePageNumberChange}
        />
      )}
    </section>
  );
}
