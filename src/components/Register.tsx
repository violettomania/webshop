import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { useNavigateOn as useNavigateOnRegister } from '../hooks/useNavigateOn';
import { registerUser } from '../state/actions/registerUser';
import { RootState } from '../state/store/store';

import SpinnerButton from './SpinnerButton';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useAppSelector((state: RootState) => state.user.loading);
  const errors = useAppSelector((state: RootState) => state.user.errors);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) toast.error('Please enter a username');
    if (!email) toast.error('Please enter an email');
    if (!password) toast.error('Please enter a password');
    if (username && email && password)
      dispatch(registerUser({ username, email, password }));
  };

  useNavigateOnRegister({ to: '/login', userStatus: 'registeredUser' });

  useEffect(() => {
    errors?.forEach((error: string) => toast.error(error));
  }, [errors]);

  return (
    <section className='h-screen grid place-items-center'>
      <form
        method='post'
        action='/register'
        className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
        onSubmit={handleSubmit}
      >
        <h4 className='text-center text-3xl font-bold'>Register</h4>
        <div className='form-control'>
          <label htmlFor='username' className='label'>
            <span className='label-text capitalize'>username</span>
          </label>
          <input
            type='text'
            name='username'
            className='input input-bordered undefined'
            disabled={loading}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='email' className='label'>
            <span className='label-text capitalize'>email</span>
          </label>
          <input
            type='email'
            name='email'
            className='input input-bordered undefined'
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <SpinnerButton loading={loading} className='mt-4 btn-primary'>
          register
        </SpinnerButton>
        <p className='text-center'>
          Already a member?
          <Link
            className='ml-2 link link-hover link-primary capitalize'
            to='/login'
          >
            login
          </Link>
        </p>
      </form>
    </section>
  );
}
