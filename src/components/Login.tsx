import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { RootState } from '../state/store/store';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../state/actions/loginUser';
import SpinnerButton from './SpinnerButton';
import { toast } from 'react-toastify';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const registeredUser = useAppSelector(
    (state: RootState) => state.user.registeredUser
  );
  const userLoggedIn = useAppSelector(
    (state: RootState) => state.user.userLoggedIn
  );
  const loading = useAppSelector((state: RootState) => state.user.loading);
  const errors = useAppSelector((state: RootState) => state.user.errors);
  const dispatch = useAppDispatch();

  const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked. Loading:', loading);
    e.preventDefault();
    dispatch(loginUser({ identifier, password }));
  };

  const handleGuestUserClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(loginUser({ identifier: 'test@test.com', password: 'secret' }));
  };

  // TODO NEXT: bugfix: when the user registers, it's redirected to the root, skipping the login page
  // possible fix: add a logged in user check in the root page instead of just registeredUser
  useEffect(() => {
    if (userLoggedIn && registeredUser) {
      navigate('/');
    }
  }, [navigate, registeredUser, userLoggedIn]);

  useEffect(() => {
    errors?.forEach((error) => toast.error(error));
  }, [errors]);

  return (
    <section className='h-screen grid place-items-center'>
      <form
        method='post'
        action='/login'
        className='card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
      >
        <h4 className='text-center text-3xl font-bold'>Login</h4>
        <div className='form-control'>
          <label htmlFor='identifier' className='label'>
            <span className='label-text capitalize'>identifier</span>
          </label>
          <input
            type='identifier'
            name='identifier'
            className='input input-bordered undefined'
            disabled={loading}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='password' className='label'>
            <span className='label-text capitalize'>password</span>
          </label>
          <input
            type='password'
            name='password'
            className='input input-bordered undefined'
            disabled={loading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <SpinnerButton
          loading={loading}
          text='login'
          className='mt-4 btn-primary'
          onClick={handleLoginClick}
        />
        <SpinnerButton
          loading={loading}
          text='guest user'
          className='btn-secondary'
          onClick={handleGuestUserClick}
        />
        <p className='text-center'>
          Not a member yet?{' '}
          <Link
            className='ml-2 link link-hover link-primary capitalize'
            to='/register'
          >
            register
          </Link>
        </p>
      </form>
    </section>
  );
}
