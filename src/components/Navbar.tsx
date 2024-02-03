import { FaBarsStaggered } from 'react-icons/fa6';
import { BsCart3, BsMoonFill, BsSunFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const paths = ['/', '/about', '/products', '/cart'];
const pages = ['home', 'about', 'products', 'cart'];

export default function Navbar() {
  // TODO: create hook reusing the same logic from color picker
  // TODO: reuse paths from App.tsx
  const [selectedPath, setSelectedPath] = useState('/');

  return (
    <nav className='bg-base-200'>
      <div className='navbar align-element'>
        <div className='navbar-start'>
          <Link
            aria-current='page'
            className='hidden lg:flex btn btn-primary text-3xl items-center active'
            to='/'
          >
            C
          </Link>
          <div className='dropdown'>
            <label tabIndex={0} className='btn btn-ghost lg:hidden'>
              <FaBarsStaggered className='h-6 w-6' />
            </label>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52'
            >
              {paths.map((path, idx) => (
                <li>
                  <Link
                    onClick={() => setSelectedPath(path)}
                    className={`capitalize ${
                      path === selectedPath ? 'active' : ''
                    }`}
                    to={path}
                  >
                    {pages[idx]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal'>
            <li>
              <Link aria-current='page' className='capitalize active' to='/'>
                home
              </Link>
            </li>
            <li>
              <Link className='capitalize' to='/about'>
                about
              </Link>
            </li>
            <li>
              <Link className='capitalize' to='/products'>
                products
              </Link>
            </li>
            <li>
              <Link className='capitalize' to='/cart'>
                cart
              </Link>
            </li>
          </ul>
        </div>
        <div className='navbar-end'>
          <label className='swap swap-rotate'>
            <input type='checkbox' />
            <BsSunFill className='swap-on h-4 w-4' />
            <BsMoonFill className='swap-off h-4 w-4' />
          </label>
          <Link className='btn btn-ghost btn-circle btn-md ml-4' to='/cart'>
            <div className='indicator'>
              <BsCart3 />
              <span className='badge badge-sm badge-primary indicator-item'>
                1
              </span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
