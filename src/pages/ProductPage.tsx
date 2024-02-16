import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import Product from '../components/Product';
import { useParams } from 'react-router-dom';
import { RootState } from '../state/store/store';
import { useEffect } from 'react';
import { fetchProduct } from '../state/actions/fetchProduct';
import Loading from '../components/Loading';

export default function ProductPage() {
  const dispatch = useAppDispatch();
  const singleProduct = useAppSelector(
    (state: RootState) => state.single.product
  );
  const loading = useAppSelector((state: RootState) => state.single.loading);

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id]);

  return loading ? <Loading /> : <Product {...singleProduct} />;
}
