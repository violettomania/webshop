import { useEffect, useState } from 'react';
import { fetchProducts } from '../actions/fetchProducts';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import ProductsFilter from './ProductsFilter';
import ProductCard from './ProductCard';
import Loading from './Loading';
import { ProductCardType } from '../slices/featuredProductsSlice';
import ProductsLayoutToggle from './ProductsLayoutToggle';

const gridDisplayClasses = 'pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3';
const listDisplayClasses = 'mt-12 grid gap-y-8';
const listCardDisplayClasses =
  'p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap  bg-base-100 shadow-xl hover:shadow-2xl duration-300 group';
const selectedPageButtonClasses = 'bg-base-300 border-base-300';
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
    Number(localStorage.getItem('page')) || 1
  );

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [dispatch, currentPage]);

  const handlePageNumberChange = (event: React.MouseEvent, page: number) => {
    event.preventDefault();
    dispatch(fetchProducts(page));
    setCurrentPage(page);
    localStorage.setItem('page', String(page));
  };

  const handleNextPage = (event: React.MouseEvent) => {
    event.preventDefault();
    const nextPage = currentPage + 1 > pageCount ? 1 : currentPage + 1;
    dispatch(fetchProducts(nextPage));
    setCurrentPage(nextPage);
    localStorage.setItem('page', String(nextPage));
  };

  const handlePrevPage = (event: React.MouseEvent) => {
    event.preventDefault();
    const prevPage =
      currentPage - 1 < pageCount && currentPage - 1 > 0
        ? currentPage - 1
        : pageCount;
    dispatch(fetchProducts(prevPage));
    setCurrentPage(prevPage);
    localStorage.setItem('page', String(prevPage));
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
      />
      <div>
        <div // TODO: bug: when changing page, the grid/list selector defaults to grid
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
      <div className='mt-16 flex justify-end'>
        <div className='join'>
          <button
            className='btn btn-xs sm:btn-md join-item'
            onClick={handlePrevPage}
          >
            Prev
          </button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
            <button
              onClick={(e) => handlePageNumberChange(e, page)}
              key={page}
              className={`btn btn-xs sm:btn-md border-none join-item ${
                currentPage === page ? selectedPageButtonClasses : ''
              }`}
            >
              {page}
            </button>
          ))}
          <button
            className='btn btn-xs sm:btn-md join-item'
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
