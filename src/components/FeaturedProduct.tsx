export default function FeaturedProduct() {
  return (
    <a
      className='card w-full shadow-xl hover:shadow-2xl transition duration-300'
      href='/products/19'
    >
      <figure className='px-4 pt-4'>
        <img
          src='https://images.pexels.com/photos/943150/pexels-photo-943150.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1600'
          alt='avant-garde lamp'
          className='rounded-xl h-64 md:h-48 w-full object-cover'
        />
      </figure>
      <div className='card-body items-center text-center'>
        <h2 className='card-title capitalize tracking-wider'>
          avant-garde lamp
        </h2>
        <span className='text-secondary'>$179.99</span>
      </div>
    </a>
  );
}
