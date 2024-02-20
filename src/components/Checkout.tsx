import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { RootState } from '../state/store/store';
import CartTotal from './CartTotal';
import { OrderPlacement, sendOrder } from '../state/actions/sendOrder';
import { clearCart } from '../state/slices/cartSlice';
import formatPrice from '../util/priceFormatter';
import SpinnerButton from './SpinnerButton';

export default function Checkout() {
  const [firstName, setFirstName] = useState('');
  const [address, setAddress] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const registeredUser = useAppSelector(
    (state: RootState) => state.user.registeredUser
  );
  const cartItems = useAppSelector((state: RootState) => state.cart.cartItems);
  const loading = useAppSelector((state: RootState) => state.orders.loading);
  const totals = useAppSelector((state: RootState) => state.cart.totals);
  const error = useAppSelector((state: RootState) => state.orders.error);

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
      if (error) {
        toast.error('Error placing order');
      } else {
        dispatch(clearCart());
        navigate('/orders');
      }
      // TODO: bugfix: Orders button isn't selected after navigation
      toast.success('Order placed successfully');
    }
  };

  // TODO: spinner button
  // TODO: what happens on error
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
              <SpinnerButton loading={loading} className='btn-primary mt-4'>
                place your order
              </SpinnerButton>
            </form>
            <CartTotal totals={totals} />
          </div>
        </>
      )}
    </section>
  );
}
