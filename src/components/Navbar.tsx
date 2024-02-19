import { FaBarsStaggered } from 'react-icons/fa6';
import { BsCart3, BsMoonFill, BsSunFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { refreshProductsPage } from '../state/slices/productsSlice';
import { RootState } from '../state/store/store';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

const defaultPaths = ['/', '/about', '/products', '/cart'];
const defaultPages = ['home', 'about', 'products', 'cart'];
const loggedInUserPaths = ['/checkout', '/orders'];
const loggedInUserPages = ['checkout', 'orders'];

export default function Navbar() {
  // TODO: create hook reusing the same logic from color picker
  // TODO: reuse paths from App.tsx
  // TODO: move theme selection to userSlice, otherwise it will be lost on page refresh (and using the local storage doesn't make sense in this case, since the user should be able to change the theme without having to refresh the page to see the changes)
  // TODO: what about testability?
  const location = useLocation();
  const totals = useAppSelector((state: RootState) => state.cart.totals);
  const dispatch = useAppDispatch();
  const registeredUser = useAppSelector(
    (state: RootState) => state.user.registeredUser
  );

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

  useEffect(() => {
    if (location.pathname !== selectedPath) {
      setSelectedPath(location.pathname);
    }
  }, [location.pathname, selectedPath]);

  const handleClick = useCallback(
    (path: string) => {
      setSelectedPath(path);
      if (path === defaultPaths[2]) {
        dispatch(refreshProductsPage(true));
      }
    },
    [dispatch]
  );

  const renderNavbarLink = useCallback(
    (path: string, idx: number, pages: string[]) => {
      return (
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
      );
    },
    [handleClick, selectedPath]
  );

  const renderDefaultNavbarLinks = useCallback(() => {
    return defaultPaths.map((path, idx) =>
      renderNavbarLink(path, idx, defaultPages)
    );
  }, [renderNavbarLink]);

  const renderLoggedInUserNavbarLinks = useCallback(() => {
    return loggedInUserPaths.map((path, idx) =>
      renderNavbarLink(path, idx, loggedInUserPages)
    );
  }, [renderNavbarLink]);

  useEffect(() => {
    if (!registeredUser) {
      setNavbarLinks(renderDefaultNavbarLinks());
    } else {
      setNavbarLinks([
        ...renderDefaultNavbarLinks(),
        ...renderLoggedInUserNavbarLinks(),
      ]);
    }
  }, [
    registeredUser,
    renderDefaultNavbarLinks,
    renderLoggedInUserNavbarLinks,
    selectedPath,
  ]);

  return (
    <nav className='bg-base-200'>
      <div className='navbar align-element'>
        <div className='navbar-start'>
          <Link
            onClick={() => setSelectedPath(defaultPaths[0])}
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
            onClick={() => setSelectedPath(defaultPaths[3])}
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
