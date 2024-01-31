import { Link } from 'react-router-dom';
import formatPrice from '../util/priceFormatter';

interface FeaturedProductProps {
  id: string;
  title: string;
  image: string;
  price: string;
}

export default function FeaturedProduct({
  id,
  title,
  image,
  price,
}: FeaturedProductProps) {
  return (
    <Link
      className='card w-full shadow-xl hover:shadow-2xl transition duration-300'
      to={`products/${id}`}
    >
      <figure className='px-4 pt-4'>
        <img
          src={image}
          alt={title}
          aria-label={title}
          className='rounded-xl h-64 md:h-48 w-full object-cover'
        />
      </figure>
      <div className='card-body items-center text-center'>
        <h2 className='card-title capitalize tracking-wider'>{title}</h2>
        <span className='text-secondary'>{`$${formatPrice(price)}`}</span>
      </div>
    </Link>
  );
}
