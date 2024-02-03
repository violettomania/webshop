import { useEffect } from 'react';
import { fetchAllProducts } from '../actions/fetchAllProducts';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import ProductsFilter from './ProductsFilter';
import ProductCard from './ProductCard';
import Loading from './Loading';
import { ProductCardType } from '../slices/featuredProductsSlice';
import ProductsLayoutToggle from './ProductsLayoutToggle';

export default function Products() {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector((state: RootState) => state.all.products);
  const loading = useAppSelector((state: RootState) => state.all.loading);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return loading ? (
    <Loading />
  ) : (
    <section className='align-element py-20'>
      <ProductsFilter />
      <ProductsLayoutToggle productQuantity={allProducts.length} />
      <div>
        <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {allProducts.map((product: ProductCardType) => (
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
