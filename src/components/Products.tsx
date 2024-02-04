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

export default function Products() {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(
    (state: RootState) => state.paginated.products
  );
  const loading = useAppSelector((state: RootState) => state.paginated.loading);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('grid'); // TODO: good candidate for Context API / hook / signal

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleLayoutToggle = (
    event: React.MouseEvent,
    display: DisplayMode
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setDisplayMode(display);
  };

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
          <button className='btn btn-xs sm:btn-md join-item'>Prev</button>
          <button className='btn btn-xs sm:btn-md border-none join-item bg-base-300 border-base-300 '>
            1
          </button>
          <button className='btn btn-xs sm:btn-md border-none join-item '>
            2
          </button>
          <button className='btn btn-xs sm:btn-md border-none join-item '>
            3
          </button>
          <button className='btn btn-xs sm:btn-md join-item'>Next</button>
        </div>
      </div>
    </section>
  );
}
