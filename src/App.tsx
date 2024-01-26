import { FaBarsStaggered } from 'react-icons/fa6';
import { BsCart3, BsMoonFill, BsSunFill } from 'react-icons/bs';

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
                <FaBarsStaggered className='h-6 w-6' />
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
              <BsSunFill className='swap-on h-4 w-4' />
              <BsMoonFill className='swap-off h-4 w-4' />
            </label>
            <a className='btn btn-ghost btn-circle btn-md ml-4' href='/cart'>
              <div className='indicator'>
                <BsCart3 />
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
