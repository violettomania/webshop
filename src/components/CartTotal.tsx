import formatPrice from '../util/priceFormatter';
import { CartTotals } from '../state/slices/cartSlice';
import React from 'react';

interface CartTotalProps {
  totals: CartTotals;
  children?: React.ReactNode;
}

export default function CartTotal({ totals, children }: CartTotalProps) {
  const { cartTotal, orderTotal, shipping, tax } = totals;

  return (
    <div className='lg:col-span-4 lg:pl-4'>
      <div className='card bg-base-200'>
        <div className='card-body'>
          <p className='flex justify-between text-xs border-b border-base-300 pb-2'>
            <span>Subtotal</span>
            <span className='font-medium'>{`$${formatPrice(
              cartTotal.toString()
            )}`}</span>
          </p>
          <p className='flex justify-between text-xs border-b border-base-300 pb-2'>
            <span>Shipping</span>
            <span className='font-medium'>{`$${formatPrice(
              shipping.toString()
            )}`}</span>
          </p>
          <p className='flex justify-between text-xs border-b border-base-300 pb-2'>
            <span>Tax</span>
            <span className='font-medium'>{`$${formatPrice(
              tax.toString()
            )}`}</span>
          </p>
          <p className='flex justify-between text-sm mt-4 pb-2'>
            <span>Order Total</span>
            <span className='font-medium'>
              {`$${formatPrice(orderTotal.toString())}`}
            </span>
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}
