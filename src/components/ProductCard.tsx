import { Link } from 'react-router-dom';
import formatPrice from '../util/priceFormatter';

interface FeaturedProductProps {
  id: string;
  title: string;
  image: string;
  price: string;
  classes?: string;
}

export default function ProductCard({
  id,
  title,
  image,
  price,
  classes,
}: FeaturedProductProps) {
  return (
    <Link className={classes} to={`/products/${id}`}>
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
