export interface FeaturedProductProps {
  id: string;
  title: string;
  image: string;
  price: string;
}

// TODO: change <a> to <Link>
export default function FeaturedProduct({
  title,
  image,
  price,
}: FeaturedProductProps) {
  return (
    <a
      className='card w-full shadow-xl hover:shadow-2xl transition duration-300'
      href='/products/19'
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
        <span className='text-secondary'>{price}</span>
      </div>
    </a>
  );
}
