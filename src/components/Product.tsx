import { Link } from 'react-router-dom';
import formatPrice from '../util/priceFormatter';

interface ProductProps {
  id: string;
  title: string;
  company: string;
  description: string;
  image: string;
  price: string;
  colors: string[];
}

// TODO: implement color selection with classes
// <button
//   type='button'
//   className='badge w-6 h-6 mr-2 border-2 border-secondary'
//   style={{ backgroundColor: 'rgb(255, 87, 51)' }}
// ></button>
// <button
//   type='button'
//   className='badge w-6 h-6 mr-2 false'
//   style={{ backgroundColor: 'rgb(255, 255, 0)' }}
// ></button>

export default function Product({
  id,
  title,
  company,
  description,
  image,
  price,
  colors,
}: ProductProps) {
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
              <div className='mt-2'>
                {colors.map((color) => (
                  <button
                    type='button'
                    className='badge w-6 h-6 mr-2 border-2 border-secondary'
                    style={{ backgroundColor: `${color}` }}
                  ></button>
                ))}
              </div>
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
              >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>
            <div className='mt-10'>
              <button className='btn btn-secondary btn-md'>Add to bag</button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
