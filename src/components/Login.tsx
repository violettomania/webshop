import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { useHandleErrors as useHandleLoginErrors } from '../hooks/useHandleErrors';
import { useNavigateOn as useNavigateOnLogin } from '../hooks/useNavigateOn';
import { loginUser } from '../state/actions/loginUser';
import { RootState } from '../state/store/store';

import SpinnerButton from './SpinnerButton';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const loading = useAppSelector((state: RootState) => state.user.loading);
  const dispatch = useAppDispatch();

  const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!identifier) toast.error('Please enter an identifier');
    if (!password) toast.error('Please enter a password');
    if (identifier && password) dispatch(loginUser({ identifier, password }));
  };

  const handleGuestUserClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(loginUser({ identifier: 'test@test.com', password: 'secret' }));
  };

  useNavigateOnLogin({ to: '/', userStatus: 'userLoggedIn' });

  useHandleLoginErrors();

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
          className='mt-4 btn-primary'
          onClick={handleLoginClick}
        >
          login
        </SpinnerButton>
        <SpinnerButton
          loading={loading}
          className='btn-secondary'
          onClick={handleGuestUserClick}
        >
          guest user
        </SpinnerButton>
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
