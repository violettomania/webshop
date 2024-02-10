import { removeFromCart } from '../slices/cartSlice';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import CartItems from './CartItems';
import CartTotal from './CartTotal';

// TODO: add clear cart button
// TODO: would be a good idea to have cart item number separately since it's usd in multiple places
// TODO: price should not be string
export default function Cart() {
  const cartItems = useAppSelector((state: RootState) => state.cart.cartItems);
  const totals = useAppSelector((state: RootState) => state.cart.totals);

  const dispatch = useAppDispatch();

  const handleRemoveItem = (productID: number) => {
    dispatch(removeFromCart(productID));
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
              Shopping Cart
            </h2>
          </div>
          <div className='mt-8 grid gap-8 lg:grid-cols-12'>
            <CartItems onRemoveItem={handleRemoveItem} cartItems={cartItems} />
            <CartTotal totals={totals} />
          </div>
        </>
      )}
    </section>
  );
}
