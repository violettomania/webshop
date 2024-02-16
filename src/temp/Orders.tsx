import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { RootState } from "../store/store";
import { fetchOrders } from "../actions/fetchOrders";
import { useEffect } from "react";

export default function Orders() {
  const registeredUser = useAppSelector(
    (state: RootState) => state.user.registeredUser
  );
  // TODO: orders.orders is a horrible name
  const orders = useAppSelector(
    (state: RootState) => state.orders.orders
  );
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
      <div className='mt-8'>
        <h4 className='mb-4 capitalize'>total orders : 2907</h4>
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
              {orders.map(({id, attributes}) => <tr key={id}>
                  <td>{attributes.name}</td>
                  <td>{attributes.address}</td>
                  <td>{attributes.numItemsInCart}</td>
                  <td>{attributes.orderTotal}</td>
                  <td className='hidden sm:block'>12:47 pm - Jan 26th, 2024</td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
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
