import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { RootState } from '../state/store/store';
import CartTotal from './CartTotal';
import { OrderPlacement, sendOrder } from '../state/actions/sendOrder';
import formatPrice from '../util/priceFormatter';

export default function Checkout() {
  const [firstName, setFirstName] = useState('');
  const [address, setAddress] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const registeredUser = useAppSelector(
    (state: RootState) => state.user.registeredUser
  );
  const cartItems = useAppSelector((state: RootState) => state.cart.cartItems);
  const totals = useAppSelector((state: RootState) => state.cart.totals);

  // TODO: notification if shipping information is not filled in
  // TODO: bugfix: if a cart is emptied, the checkout still doesn't show it empty
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firstName) {
      toast.warning('Please fill in first name');
    }
    if (!address) {
      toast.warning('Please fill in the address');
    }
    if (firstName && address) {
      const order: OrderPlacement = {
        payload: {
          data: {
            name: firstName,
            address,
            chargeTotal: totals.orderTotal,
            orderTotal: `$${formatPrice(totals.orderTotal.toString())}`,
            cartItems,
            numItemsInCart: totals.numItemsInCart,
          },
        },
        token: registeredUser?.jwt || '',
      };
      dispatch(sendOrder(order));
      navigate('/orders');
      // TODO: send order to server, then empty cart, then redirect to orders
      // TODO: bugfix: Orders button isn't selected after navigation
      toast.success('Order placed successfully');
      // TODO: empty cart in local storage
      // TODO: empty cart
    }
  };

  return (
    <section className='align-element py-20'>
      {cartItems.length === 0 ? (
        <div className='border-b border-base-300 pb-5'>
          <h2 className='text-3xl font-medium tracking-wider capitalize'>
            Your cart is empty
          </h2>
        </div>
      ) : (
        <>
          <div className='border-b border-base-300 pb-5'>
            <h2 className='text-3xl font-medium tracking-wider capitalize'>
              place your order
            </h2>
          </div>
          <div className='mt-8 grid gap-8 md:grid-cols-2 items-start'>
            <form
              method='post'
              action='/checkout'
              className='flex flex-col gap-y-4'
              onSubmit={handleSubmit}
            >
              <h4 className='font-medium text-xl capitalize'>
                shipping information
              </h4>
              <div className='form-control'>
                <label htmlFor='name' className='label'>
                  <span className='label-text capitalize'>first name</span>
                </label>
                <input
                  type='text'
                  name='name'
                  className='input input-bordered undefined'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className='form-control'>
                <label htmlFor='address' className='label'>
                  <span className='label-text capitalize'>address</span>
                </label>
                <input
                  type='text'
                  name='address'
                  className='input input-bordered undefined'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className='mt-4'>
                <button type='submit' className='btn btn-primary btn-block'>
                  place your order
                </button>
              </div>
            </form>
            <CartTotal totals={totals} />
          </div>
        </>
      )}
    </section>
  );
}
