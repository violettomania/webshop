import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { RootState } from '../state/store/store';
import { logoutUser, signInRedirect } from '../state/slices/userSlice';

export default function Header() {
  const registeredUser = useAppSelector(
    (state: RootState) => state.user.registeredUser
  );

  const dispatch = useAppDispatch();

  return (
    <header className='bg-neutral py-2 text-neutral-content'>
      <div className='align-element flex justify-center sm:justify-end'>
        {registeredUser ? (
          <div className='flex gap-x-2 sm:gap-x-8 items-center'>
            <p className='text-xs sm:text-sm'>{`Hello, ${registeredUser.user.username}`}</p>
            <button
              className='btn btn-xs btn-outline btn-primary'
              onClick={() => dispatch(logoutUser())}
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
            <Link className='link link-hover text-xs sm:text-sm' to='/register'>
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
