import { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { fetchFeaturedProducts } from '../actions/fetchFeaturedProducts';
import FeaturedProduct from './FeaturedProduct';
import { FeaturedProductType } from '../slices/featuredProductsSlice';
import Loading from './Loading';

export default function FeaturedProducts() {
  const dispatch = useAppDispatch();
  const featuredProducts = useAppSelector(
    (state: RootState) => state.featured.products
  );
  const loading = useAppSelector((state: RootState) => state.featured.loading);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  // TODO: use unified type instead of FeaturedProductProps (Partial, Omit?)
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
        {featuredProducts.map((product: FeaturedProductType) => (
          <FeaturedProduct key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
