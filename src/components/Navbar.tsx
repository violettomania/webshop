import { FaBarsStaggered } from 'react-icons/fa6';
import { BsCart3, BsMoonFill, BsSunFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { refreshProductsPage } from '../slices/productsSlice';
import { RootState } from '../store/store';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

const paths = ['/', '/about', '/products', '/cart'];
const pages = ['home', 'about', 'products', 'cart'];

export default function Navbar() {
  // TODO: create hook reusing the same logic from color picker
  // TODO: reuse paths from App.tsx
  // TODO: move theme selection to userSlice, otherwise it will be lost on page refresh (and using the local storage doesn't make sense in this case, since the user should be able to change the theme without having to refresh the page to see the changes)
  // TODO: refactor: clicking on logo must select Home navbar item
  // TODO: what about testability?
  const location = useLocation();
  const totals = useAppSelector((state: RootState) => state.cart.totals);
  const dispatch = useAppDispatch();

  const [selectedPath, setSelectedPath] = useState(location.pathname);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'winter');
  const [navbarLinks, setNavbarLinks] = useState<JSX.Element[]>([]);

  const toggleTheme = () => {
    const newTheme = theme === 'winter' ? 'dracula' : 'winter';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute(
      'data-theme',
      localStorage.getItem('theme') || 'winter'
    );
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute(
      'data-theme',
      localStorage.getItem('theme') || 'winter'
    );
  }, [theme]);

  const handleClick = useCallback(
    (path: string) => {
      setSelectedPath(path);
      if (path === paths[2]) {
        dispatch(refreshProductsPage(true));
      }
    },
    [dispatch]
  );

  const renderNavbarLinks = useCallback(() => {
    const links = paths.map((path, idx) => (
      <li key={path}>
        <Link
          onClick={() => handleClick(path)}
          className={`capitalize ${path === selectedPath ? 'active' : ''}`}
          to={path}
          aria-current={path === selectedPath ? 'page' : undefined}
        >
          {pages[idx]}
        </Link>
      </li>
    ));
    setNavbarLinks(links);
  }, [handleClick, selectedPath]);

  useEffect(() => {
    renderNavbarLinks();
  }, [renderNavbarLinks, selectedPath]);

  return (
    <nav className='bg-base-200'>
      <div className='navbar align-element'>
        <div className='navbar-start'>
          <Link
            onClick={() => setSelectedPath(paths[0])}
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
              {navbarLinks}
            </ul>
          </div>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal'>{navbarLinks}</ul>
        </div>
        <div className='navbar-end'>
          <label className='swap swap-rotate'>
            <input type='checkbox' onClick={toggleTheme} />
            <BsSunFill className='swap-on h-4 w-4' />
            <BsMoonFill className='swap-off h-4 w-4' />
          </label>
          <Link
            className='btn btn-ghost btn-circle btn-md ml-4'
            to='/cart'
            onClick={() => setSelectedPath(paths[3])}
          >
            <div className='indicator'>
              <BsCart3 />
              <span className='badge badge-sm badge-primary indicator-item'>
                {totals.numItemsInCart}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
