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
const selectedPageButtonClasses = 'bg-base-300 border-base-300';

export default function Products() {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(
    (state: RootState) => state.paginated.products
  );
  const loading = useAppSelector((state: RootState) => state.paginated.loading);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('grid'); // TODO: good candidate for Context API / hook / signal
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts(1));
  }, [dispatch]);

  const handlePageNumberChange = (event: React.MouseEvent, page: number) => {
    event.preventDefault();
    dispatch(fetchProducts(page));
    setCurrentPage(page);
  };

  const handleNextPage = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(fetchProducts(currentPage + 1));
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(fetchProducts(currentPage - 1));
    setCurrentPage(currentPage - 1);
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
  // TODO: pagination component should not disappear during loading
  // TODO: pagination: add max page number
  // TODO: pagination: prev and next should go around the max/min page number
  // TODO: pagination: add ... ?
  return loading ? (
    <Loading />
  ) : (
    <section className='align-element py-20'>
      <ProductsFilter />
      <ProductsLayoutToggle
        productQuantity={allProducts.length}
        onLayoutToggle={handleLayoutToggle}
      />
      <div>
        <div
          className={`${
            displayMode === 'grid' ? gridDisplayClasses : listDisplayClasses
          }`}
        >
          {allProducts.map((product: ProductCardType) => (
            // TODO: add grid and list view to cards
            <ProductCard key={product.id} {...product} />
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
          <button
            onClick={(e) => handlePageNumberChange(e, 1)}
            className={`btn btn-xs sm:btn-md border-none join-item ${
              currentPage === 1 ? selectedPageButtonClasses : ''
            }`}
          >
            1
          </button>
          <button
            onClick={(e) => handlePageNumberChange(e, 2)}
            className={`btn btn-xs sm:btn-md border-none join-item ${
              currentPage === 2 ? selectedPageButtonClasses : ''
            }`}
          >
            2
          </button>
          <button
            onClick={(e) => handlePageNumberChange(e, 3)}
            className={`btn btn-xs sm:btn-md border-none join-item ${
              currentPage === 3 ? selectedPageButtonClasses : ''
            }`}
          >
            3
          </button>
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
