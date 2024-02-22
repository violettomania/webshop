import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../components/Loading';
import Product from '../components/Product';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchProduct } from '../state/actions/fetchProduct';
import { RootState } from '../state/store/store';

export default function ProductPage() {
  const dispatch = useAppDispatch();
  const singleProduct = useAppSelector(
    (state: RootState) => state.single.product
  );
  const loading = useAppSelector((state: RootState) => state.single.loading);

  let { id } = useParams();

  // TODO: next: bugfix: arbitrary id's work despite receiving 404 from server
  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id]);

  return loading ? <Loading /> : <Product {...singleProduct} />;
}
