import { RootState, useAppSelector } from '../store/store';
import formatPrice from '../util/priceFormatter';

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
            <div className='lg:col-span-8'>
              {cartItems.map(
                ({
                  productID,
                  image,
                  title,
                  price,
                  company,
                  productColor,
                  amount,
                }) => (
                  <article
                    key={productID}
                    className='mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0'
                  >
                    <img
                      src={image}
                      alt={title}
                      className='h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover'
                    />
                    <div className='sm:ml-16 sm:w-48'>
                      <h3 className='capitalize font-medium'>{title}</h3>
                      <h4 className='mt-2 capitalize text-sm text-neutral-content'>
                        {company}
                      </h4>
                      <p className='mt-4 text-sm capitalize flex items-center gap-x-2'>
                        color :
                        <span
                          className='badge badge-sm'
                          style={{ backgroundColor: `${productColor}` }}
                        ></span>
                      </p>
                    </div>
                    <div className='sm:ml-12'>
                      <div className='form-control max-w-xs'>
                        <label htmlFor='amount' className='label p-0'>
                          <span className='label-text'>Amount</span>
                        </label>
                        <select
                          name='amount'
                          id='amount'
                          className='mt-2 select select-base select-bordered select-xs'
                          defaultValue={amount}
                        >
                          {Array.from({ length: 20 }, (_, i) => i + 1).map(
                            (number) => (
                              <option key={number} value={number}>
                                {number}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <button className='mt-2 link link-primary link-hover text-sm'>
                        remove
                      </button>
                    </div>
                    <p className='font-medium sm:ml-auto'>{`$${formatPrice(
                      price
                    )}`}</p>
                  </article>
                )
              )}
            </div>
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
