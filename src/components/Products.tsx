import { useEffect } from 'react';
import { fetchAllProducts } from '../actions/fetchAllProducts';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import ProductsFilter from './ProductsFilter';
import FeaturedProduct from './FeaturedProduct';
import { FeaturedProductType } from '../slices/allProductsSlice';
import Loading from './Loading';
import { BsFillGridFill, BsList } from 'react-icons/bs';

export default function Products() {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(
    (state: RootState) => state.featured.products
  );
  const loading = useAppSelector((state: RootState) => state.featured.loading);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // TODO: bugfix: products are not displayed
  return loading ? (
    <Loading />
  ) : (
    <section className='align-element py-20'>
      <ProductsFilter />
      <div className='flex justify-between items-center mt-8 border-b border-base-300 pb-5'>
        <h4 className='font-medium text-md'>{`${allProducts.length} products`}</h4>
        <div className='flex gap-x-2'>
          <button
            type='button'
            className='text-xl btn btn-circle btn-sm btn-primary text-primary-content'
          >
            <BsFillGridFill />
          </button>
          <button
            type='button'
            className='text-xl btn btn-circle btn-sm btn-ghost text-based-content'
          >
            <BsList />
          </button>
        </div>
      </div>
      <div>
        <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {allProducts.map((product: FeaturedProductType) => (
            <FeaturedProduct key={product.id} {...product} />
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
