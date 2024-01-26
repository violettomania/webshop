import { FaBarsStaggered } from 'react-icons/fa6';
import { BsCart3, BsMoonFill, BsSunFill } from 'react-icons/bs';

export default function Navbar() {
  return (
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
  );
}
