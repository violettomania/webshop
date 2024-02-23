import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooksWrapper';
import { clearCart } from '../state/slices/cartSlice';
import { logoutUser, signInRedirect } from '../state/slices/userSlice';
import { RootState } from '../state/store/store';

export default function Header() {
  const registeredUser = useAppSelector(
    (state: RootState) => state.user.registeredUser
  );

  const dispatch = useAppDispatch();

  function registerRedirect(): any {
    throw new Error('Function not implemented.');
  }

  return (
    <header className='bg-neutral py-2 text-neutral-content'>
      <div className='align-element flex justify-center sm:justify-end'>
        {registeredUser ? (
          <div className='flex gap-x-2 sm:gap-x-8 items-center'>
            <p className='text-xs sm:text-sm'>{`Hello, ${registeredUser.user.username}`}</p>
            <button
              className='btn btn-xs btn-outline btn-primary'
              onClick={() => {
                dispatch(clearCart());
                dispatch(logoutUser());
              }}
            >
              LOGOUT
            </button>
          </div>
        ) : (
          <div className='flex gap-x-6 justify-center items-center'>
            <Link
              className='link link-hover text-xs sm:text-sm'
              to='login'
              onClick={() => dispatch(signInRedirect())}
            >
              Sign in / Guest
            </Link>
            <Link
              className='link link-hover text-xs sm:text-sm'
              to='/register'
              onClick={() => dispatch(registerRedirect())}
            >
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
