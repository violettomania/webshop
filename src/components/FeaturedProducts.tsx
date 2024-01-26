export default function FeaturedProducts() {
  return (
    <div className='pt-24'>
      <div className='border-b border-base-300 pb-5'>
        <h2 className='text-3xl font-medium tracking-wider capitalize'>
          featured products
        </h2>
      </div>
      <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
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
        <a
          className='card w-full shadow-xl hover:shadow-2xl transition duration-300'
          href='/products/6'
        >
          <figure className='px-4 pt-4'>
            <img
              src='https://images.pexels.com/photos/3679601/pexels-photo-3679601.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1260&amp;h=750&amp;dpr=2'
              alt='coffee table'
              className='rounded-xl h-64 md:h-48 w-full object-cover'
            />
          </figure>
          <div className='card-body items-center text-center'>
            <h2 className='card-title capitalize tracking-wider'>
              coffee table
            </h2>
            <span className='text-secondary'>$179.99</span>
          </div>
        </a>
        <a
          className='card w-full shadow-xl hover:shadow-2xl transition duration-300'
          href='/products/7'
        >
          <figure className='px-4 pt-4'>
            <img
              src='https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1600'
              alt='comfy bed'
              className='rounded-xl h-64 md:h-48 w-full object-cover'
            />
          </figure>
          <div className='card-body items-center text-center'>
            <h2 className='card-title capitalize tracking-wider'>comfy bed</h2>
            <span className='text-secondary'>$129.99</span>
          </div>
        </a>
      </div>
    </div>
  );
}
