import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import {
  changeAmountInCart,
  clearCart,
  removeFromCart,
} from '../state/slices/cartSlice';
import { RootState } from '../state/store/store';

import CartItems from './CartItems';
import CartNavigation from './CartNavigation';
import CartTotal from './CartTotal';
import EmptyCartHeader from './EmptyCartHeader';

export default function Cart() {
  const cartItems = useAppSelector((state: RootState) => state.cart.cartItems);
  const totals = useAppSelector((state: RootState) => state.cart.totals);

  const dispatch = useAppDispatch();

  const handleChangeItemAmount = (productID: number, amount: number) => {
    dispatch(changeAmountInCart({ productID, amount }));
  };

  const handleRemoveItem = (productID: number) => {
    dispatch(removeFromCart(productID));
  };

  return (
    <section className='align-element py-20'>
      {cartItems.length === 0 ? (
        <EmptyCartHeader />
      ) : (
        <>
          <div className='border-b border-base-300 pb-5'>
            <h2 className='text-3xl font-medium tracking-wider capitalize'>
              Shopping Cart
            </h2>
          </div>
          <div className='mt-8 grid gap-8 lg:grid-cols-12'>
            <CartItems
              onRemoveItem={handleRemoveItem}
              onChangeItemAmount={handleChangeItemAmount}
              cartItems={cartItems}
            />
            <div className='lg:col-span-4 lg:pl-4'>
              <CartTotal totals={totals}>
                <CartNavigation />
                <div className='lg:col-span-4 lg:pl-4'>
                  <button
                    className='btn btn-secondary btn-block mt-4'
                    onClick={() => dispatch(clearCart())}
                  >
                    CLEAR CART
                  </button>
                </div>
              </CartTotal>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
