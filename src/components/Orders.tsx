import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { RootState } from '../state/store/store';
import { fetchOrders } from '../state/actions/fetchOrders';
import { useEffect } from 'react';

export default function Orders() {
  const orders = useAppSelector((state: RootState) => state.orders);
  const loading = useAppSelector((state: RootState) => state.orders.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrders('token'));
  }, [dispatch]);

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
              <tr>
                <td>Cheerful Charlotte</td>
                <td>Chuckling Circle, Quirkington</td>
                <td>11</td>
                <td>$2,182.88</td>
                <td className='hidden sm:block'>12:47 pm - Jan 26th, 2024</td>
              </tr>
              <tr>
                <td>Punny Penny</td>
                <td>Giggle Alley, Humor Hollow</td>
                <td>6</td>
                <td>₹ 119293.4</td>
                <td className='hidden sm:block'>09:32 am - Jan 26th, 2024</td>
              </tr>
              <tr>
                <td>Silly Billy</td>
                <td>Laugh Avenue, Chuckle Town</td>
                <td>1</td>
                <td>$378.99</td>
                <td className='hidden sm:block'>07:33 am - Jan 26th, 2024</td>
              </tr>
              <tr>
                <td>Giggle Gary</td>
                <td>Wit Way, Snickerston</td>
                <td>3</td>
                <td>₹ 43396.7</td>
                <td className='hidden sm:block'>07:18 am - Jan 26th, 2024</td>
              </tr>
              <tr>
                <td>Riddle Rita</td>
                <td>Giggle Lane, Chuckleberg</td>
                <td>2</td>
                <td>$576.98</td>
                <td className='hidden sm:block'>07:14 am - Jan 26th, 2024</td>
              </tr>
              <tr>
                <td>Chortle Thompson</td>
                <td>Comedy Corner, Jestville</td>
                <td>1</td>
                <td>37,898</td>
                <td className='hidden sm:block'>02:19 am - Jan 26th, 2024</td>
              </tr>
              <tr>
                <td>Punmaster Pete</td>
                <td>Joke Lane, Hahaville</td>
                <td>1</td>
                <td>$202.99</td>
                <td className='hidden sm:block'>09:14 pm - Jan 25th, 2024</td>
              </tr>
              <tr>
                <td>Riddle Rita</td>
                <td>Giggle Lane, Chuckleberg</td>
                <td>2</td>
                <td>$554.98</td>
                <td className='hidden sm:block'>02:44 pm - Jan 25th, 2024</td>
              </tr>
              <tr>
                <td>Giggle Gene</td>
                <td>Jest Street, Snortington</td>
                <td>2</td>
                <td>$576.98</td>
                <td className='hidden sm:block'>02:43 pm - Jan 25th, 2024</td>
              </tr>
              <tr>
                <td>Punmaster Pete</td>
                <td>Joke Lane, Hahaville</td>
                <td>3</td>
                <td>$961.97</td>
                <td className='hidden sm:block'>02:22 pm - Jan 25th, 2024</td>
              </tr>
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
