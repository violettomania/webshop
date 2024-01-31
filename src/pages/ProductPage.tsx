import { useAppDispatch, useAppSelector } from '../store/store';
import Product from '../components/Product';
import { useParams } from 'react-router-dom';
import { RootState } from '../store/store';
import { useEffect } from 'react';
import { fetchProduct } from '../actions/fetchProduct';

export default function ProductPage() {
  const dispatch = useAppDispatch();
  const singleProduct = useAppSelector(
    (state: RootState) => state.single.product
  );

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id]);

  return <Product {...singleProduct} />;
}
