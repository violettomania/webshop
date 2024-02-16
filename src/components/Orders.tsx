import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { RootState } from '../state/store/store';
import { fetchOrders } from '../state/actions/fetchOrders';
import { useEffect } from 'react';
import SingleOrder from './Order';
import Loading from './Loading';

// TODO: orders table is sometimes empty on refresh
export default function Orders() {
  const registeredUser = useAppSelector(
    (state: RootState) => state.user.registeredUser
  );
  // TODO: orders.orders is a horrible name
  const orders = useAppSelector((state: RootState) => state.orders.orders);
  const total = useAppSelector((state: RootState) => state.orders.total);
  const loading = useAppSelector((state: RootState) => state.orders.loading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (registeredUser) dispatch(fetchOrders(registeredUser?.jwt));
  }, [dispatch, registeredUser]);

  return (
    <section className='align-element py-20'>
      <div className='border-b border-base-300 pb-5'>
        <h2 className='text-3xl font-medium tracking-wider capitalize'>
          Your Orders
        </h2>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className='mt-8'>
          <h4 className='mb-4 capitalize'>{`total orders : ${total}`}</h4>
          <div className='overflow-x-auto'>
            <table className='table table-zebra'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Products</th>
                  <th>Cost</th>
                  <th className='hidden sm:block'>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(({ id, attributes }) => (
                  <SingleOrder key={id} {...attributes} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className='mt-16 flex justify-end'>
        <div className='join'>
          <button className='btn btn-xs sm:btn-md join-item'>Prev</button>
          <button className='btn btn-xs sm:btn-md border-none join-item bg-base-300 border-base-300 '>
            1
          </button>
          <button className='join-item btn btn-xs sm:btn-md'>...</button>
          <button className='btn btn-xs sm:btn-md border-none join-item '>
            291
          </button>
          <button className='btn btn-xs sm:btn-md join-item'>Next</button>
        </div>
      </div>
    </section>
  );
}
