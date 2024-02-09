import { RootState, useAppSelector } from '../store/store';
import formatPrice from '../util/priceFormatter';

export default function CartItems() {
  const cartItems = useAppSelector((state: RootState) => state.cart.cartItems);

  return (
    <div className='lg:col-span-8'>
      {cartItems.map(
        ({ productID, image, title, price, company, productColor, amount }) => (
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
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((number) => (
                    <option key={number} value={number}>
                      {number}
                    </option>
                  ))}
                </select>
              </div>
              <button className='mt-2 link link-primary link-hover text-sm'>
                remove
              </button>
            </div>
            <p className='font-medium sm:ml-auto'>{`$${formatPrice(price)}`}</p>
          </article>
        )
      )}
    </div>
  );
}
