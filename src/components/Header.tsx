import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { RootState } from '../state/store/store';
import { logoutUser } from '../state/slices/userSlice';

export default function Header() {
  // TODO: should be user.username
  const registeredUser = useAppSelector(
    (state: RootState) => state.user.registeredUser
  );

  const dispatch = useAppDispatch();

  // TODO: redirect to login page on logout
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
            <Link className='link link-hover text-xs sm:text-sm' to='/login'>
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
