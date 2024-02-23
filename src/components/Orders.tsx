import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchOrders } from '../state/actions/fetchOrders';
import { RootState } from '../state/store/store';

import Loading from './Loading';
import SingleOrder from './Order';
import OrdersPagination from './OrdersPagination';

export default function Orders() {
  const registeredUser = useAppSelector(
    (state: RootState) => state.user.registeredUser
  );
  const orders = useAppSelector((state: RootState) => state.orders.pagedOrders);
  const total = useAppSelector((state: RootState) => state.orders.total);
  const error = useAppSelector((state: RootState) => state.orders.error);
  const loading = useAppSelector((state: RootState) => state.orders.loading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (registeredUser) dispatch(fetchOrders({}));
  }, [dispatch, registeredUser]);

  useEffect(() => {
    if (error) toast.error('There was an error fetching your orders');
  }, [error]);

  const handlePageNumberChange = (page: number) => {
    if (registeredUser) dispatch(fetchOrders({ page }));
  };

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
                {orders.map(
                  ({
                    id,
                    attributes,
                  }: {
                    id: string;
                    attributes: OrderAttributes;
                  }) => (
                    <SingleOrder key={id} {...attributes} />
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <OrdersPagination onPageNumberChange={handlePageNumberChange} />
    </section>
  );
}
