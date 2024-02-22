import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchFeaturedProducts } from '../state/actions/fetchFeaturedProducts';
import { RootState } from '../state/store/store';

import Loading from './Loading';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const dispatch = useAppDispatch();
  const productCards = useAppSelector(
    (state: RootState) => state.featured.products
  );
  const loading = useAppSelector((state: RootState) => state.featured.loading);
  const error = useAppSelector((state: RootState) => state.featured.error);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error('There was an error fetching the products');
  }, [error]);

  return loading ? (
    <Loading />
  ) : (
    <div className='pt-24'>
      <div className='border-b border-base-300 pb-5'>
        <h2 className='text-3xl font-medium tracking-wider capitalize'>
          featured products
        </h2>
      </div>
      <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {productCards.map((product: ProductCard) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
