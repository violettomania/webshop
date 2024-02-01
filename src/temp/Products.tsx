import ProductsFilter from "./ProductsFilter";

export default function Products() {
  return (
    <section className='align-element py-20'>
      <ProductsFilter />
      <div className='flex justify-between items-center mt-8 border-b border-base-300 pb-5'>
        <h4 className='font-medium text-md'>22 products</h4>
        <div className='flex gap-x-2'>
          <button
            type='button'
            className='text-xl btn btn-circle btn-sm btn-primary text-primary-content'
          >
            <svg
              stroke='currentColor'
              fill='currentColor'
              stroke-width='0'
              viewBox='0 0 16 16'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z'></path>
            </svg>
          </button>
          <button
            type='button'
            className='text-xl btn btn-circle btn-sm btn-ghost text-based-content'
          >
            <svg
              stroke='currentColor'
              fill='currentColor'
              stroke-width='0'
              viewBox='0 0 16 16'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div>
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
            href='/products/12'
          >
            <figure className='px-4 pt-4'>
              <img
                src='https://images.pexels.com/photos/5705090/pexels-photo-5705090.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1600'
                alt='chic chair'
                className='rounded-xl h-64 md:h-48 w-full object-cover'
              />
            </figure>
            <div className='card-body items-center text-center'>
              <h2 className='card-title capitalize tracking-wider'>
                chic chair
              </h2>
              <span className='text-secondary'>$339.99</span>
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
        </div>
      </div>
      <div className='mt-16 flex justify-end'>
        <div className='join'>
          <button className='btn btn-xs sm:btn-md join-item'>Prev</button>
          <button className='btn btn-xs sm:btn-md border-none join-item bg-base-300 border-base-300 '>
            1
          </button>
          <button className='btn btn-xs sm:btn-md border-none join-item '>
            2
          </button>
          <button className='btn btn-xs sm:btn-md border-none join-item '>
            3
          </button>
          <button className='btn btn-xs sm:btn-md join-item'>Next</button>
        </div>
      </div>
    </section>
  );
}
