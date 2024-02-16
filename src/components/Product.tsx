import { Link } from 'react-router-dom';
import formatPrice from '../util/priceFormatter';
import ColorPicker from './ColorPicker';
import { useAppDispatch } from '../hooks/hooks';
import { addToCart } from '../state/slices/cartSlice';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface ProductProps {
  id: string;
  title: string;
  company: string;
  description: string;
  image: string;
  price: string;
  colors: string[];
}

export default function Product({
  id,
  title,
  company,
  description,
  image,
  price,
  colors,
}: ProductProps) {
  const [amount, setAmount] = useState(1);
  const [color, setColor] = useState(colors[0]);

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        cartId: '1',
        productID: Number(id),
        image,
        title,
        price,
        company,
        productColor: color,
        amount,
      })
    );
    // TODO: implement toast color theme
    toast.success('Item added to cart!');
  };

  if (!title || !company || !description || !image || !price || !colors) {
    return (
      <section className='align-element py-20'>
        <h4 className='font-bold text-4xl'>There was an error...</h4>
      </section>
    );
  }
  return (
    <section className='align-element py-20'>
      <section>
        <div className='text-md breadcrumbs'>
          <ul>
            <li>
              <Link to='/'>home</Link>
            </li>
            <li>
              <Link to='/products'>products</Link>
            </li>
          </ul>
        </div>
        <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
          <img
            src={image}
            alt={title}
            aria-label={title}
            className='w-96 h-96 object-cover rounded-lg lg:w-full'
          />
          <div>
            <h1 className='capitalize text-3xl font-bold'>{title}</h1>
            <h4 className='text-xl text-neutral-content font-bold mt-2'>
              {company}
            </h4>
            <p className='mt-3 text-xl'>{`$${formatPrice(price)}`}</p>
            <p className='mt-6 leading-8'>{description}</p>
            <div className='mt-6'>
              <h4 className='text-md font-medium tracking-wider capitalize'>
                colors
              </h4>
              <ColorPicker colors={colors} onColorChange={setColor} />
            </div>
            <div className='form-control w-full max-w-xs'>
              <label className='label' htmlFor='amount'>
                <h4 className='text-md font-medium -tracking-wider capitalize'>
                  amount
                </h4>
              </label>
              <select
                className='select select-secondary select-bordered select-md'
                id='amount'
                onChange={(e) => setAmount(Number(e.target.value))}
              >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>
            <div className='mt-10'>
              <button
                className='btn btn-secondary btn-md'
                onClick={handleAddToCart}
              >
                Add to bag
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
