import { useAppSelector } from '../hooks/hooks';
import { RootState } from '../state/store/store';
import CartTotal from './CartTotal';

export default function Checkout() {
  const cartItems = useAppSelector((state: RootState) => state.cart.cartItems);
  const totals = useAppSelector((state: RootState) => state.cart.totals);

  // TODO: notification if shipping information is not filled in
  // TODO: bugfix: if a cart is emptied, the checkout still doesn't show it empty

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
                  value=''
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
                  value=''
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
