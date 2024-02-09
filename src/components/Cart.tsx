import { RootState, useAppSelector } from '../store/store';
import CartItems from './CartItems';

// TODO: add clear cart button
export default function Cart() {
  const cartItems = useAppSelector((state: RootState) => state.cart.cartItems);

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
              Shopping Cart
            </h2>
          </div>
          <div className='mt-8 grid gap-8 lg:grid-cols-12'>
            <CartItems />
            <div className='lg:col-span-4 lg:pl-4'>
              <div className='card bg-base-200'>
                <div className='card-body'>
                  <p className='flex justify-between text-xs border-b border-base-300 pb-2'>
                    <span>Subtotal</span>
                    <span className='font-medium'>$179.99</span>
                  </p>
                  <p className='flex justify-between text-xs border-b border-base-300 pb-2'>
                    <span>Shipping</span>
                    <span className='font-medium'>$5.00</span>
                  </p>
                  <p className='flex justify-between text-xs border-b border-base-300 pb-2'>
                    <span>Tax</span>
                    <span className='font-medium'>$18.00</span>
                  </p>
                  <p className='flex justify-between text-sm mt-4 pb-2'>
                    <span>Order Total</span>
                    <span className='font-medium'>$202.99</span>
                  </p>
                </div>
              </div>
              <a className='btn btn-primary btn-block mt-8' href='/login'>
                please login
              </a>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
