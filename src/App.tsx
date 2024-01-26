import { FaBarsStaggered } from 'react-icons/fa6';

export default function App() {
  return (
    <>
      <header className='bg-neutral py-2 text-neutral-content'>
        <div className='align-element flex justify-center sm:justify-end'>
          <div className='flex gap-x-6 justify-center items-center'>
            <a className='link link-hover text-xs sm:text-sm' href='/login'>
              Sign in / Guest
            </a>
            <a className='link link-hover text-xs sm:text-sm' href='/register'>
              Create Account
            </a>
          </div>
        </div>
      </header>
      <nav className='bg-base-200'>
        <div className='navbar align-element'>
          <div className='navbar-start'>
            <a
              aria-current='page'
              className='hidden lg:flex btn btn-primary text-3xl items-center active'
              href='/'
            >
              C
            </a>
            <div className='dropdown'>
              <label tabIndex={0} className='btn btn-ghost lg:hidden'>
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  stroke-width='0'
                  viewBox='0 0 512 512'
                  className='h-6 w-6'
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z'></path>
                </svg>
              </label>
              <ul
                tabIndex={0}
                className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52'
              >
                <li>
                  <a aria-current='page' className='capitalize active' href='/'>
                    home
                  </a>
                </li>
                <li>
                  <a className='capitalize' href='/about'>
                    about
                  </a>
                </li>
                <li>
                  <a className='capitalize' href='/products'>
                    products
                  </a>
                </li>
                <li>
                  <a className='capitalize' href='/cart'>
                    cart
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='navbar-center hidden lg:flex'>
            <ul className='menu menu-horizontal'>
              <li>
                <a aria-current='page' className='capitalize active' href='/'>
                  home
                </a>
              </li>
              <li>
                <a className='capitalize' href='/about'>
                  about
                </a>
              </li>
              <li>
                <a className='capitalize' href='/products'>
                  products
                </a>
              </li>
              <li>
                <a className='capitalize' href='/cart'>
                  cart
                </a>
              </li>
            </ul>
          </div>
          <div className='navbar-end'>
            <label className='swap swap-rotate'>
              <input type='checkbox' />
              <svg
                stroke='currentColor'
                fill='currentColor'
                stroke-width='0'
                viewBox='0 0 16 16'
                className='swap-on h-4 w-4'
                height='1em'
                width='1em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z'></path>
              </svg>
              <svg
                stroke='currentColor'
                fill='currentColor'
                stroke-width='0'
                viewBox='0 0 16 16'
                className='swap-off h-4 w-4'
                height='1em'
                width='1em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z'></path>
              </svg>
            </label>
            <a className='btn btn-ghost btn-circle btn-md ml-4' href='/cart'>
              <div className='indicator'>
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  stroke-width='0'
                  viewBox='0 0 16 16'
                  className='h-6 w-6'
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z'></path>
                </svg>
                <span className='badge badge-sm badge-primary indicator-item'>
                  1
                </span>
              </div>
            </a>
          </div>
        </div>
      </nav>
      <section className='align-element py-20'>
        <div className='grid lg:grid-cols-2 gap-24 items-center'>
          <div>
            <h1 className='max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl'>
              We are changing the way people shop
            </h1>
            <p className='mt-8 max-w-xl text-lg leading-8'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              repellat explicabo enim soluta temporibus asperiores aut obcaecati
              perferendis porro nobis.
            </p>
            <div className='mt-10'>
              <a className='btn btn-primary' href='/products'>
                Our Products
              </a>
            </div>
          </div>
          <div className='hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box '>
            <div className='carousel-item'>
              <img
                src='/src/assets/hero1.webp'
                className='rounded-box h-full w-80 object-cover'
                alt='product'
              />
            </div>
            <div className='carousel-item'>
              <img
                src='/src/assets/hero2.webp'
                className='rounded-box h-full w-80 object-cover'
                alt='product'
              />
            </div>
            <div className='carousel-item'>
              <img
                src='/src/assets/hero3.webp'
                className='rounded-box h-full w-80 object-cover'
                alt='product'
              />
            </div>
            <div className='carousel-item'>
              <img
                src='/src/assets/hero4.webp'
                className='rounded-box h-full w-80 object-cover'
                alt='product'
              />
            </div>
          </div>
        </div>
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
                <h2 className='card-title capitalize tracking-wider'>
                  comfy bed
                </h2>
                <span className='text-secondary'>$129.99</span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
