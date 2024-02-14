import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { RootState } from '../store/store';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../actions/loginUser';
import SpinnerButton from './SpinnerButton';
import { toast } from 'react-toastify';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const registeredUser = useAppSelector(
    (state: RootState) => state.user.registeredUser
  );
  const loading = useAppSelector((state: RootState) => state.user.loading);
  const errors = useAppSelector((state: RootState) => state.user.errors);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({ identifier, password }));
  };

  useEffect(() => {
    if (registeredUser) {
      navigate('/');
    }
  }, [registeredUser, navigate]);

  useEffect(() => {
    errors?.forEach((error) => toast.error(error));
  }, [errors]);

  return (
    <section className='h-screen grid place-items-center'>
      <form
        method='post'
        action='/login'
        className='card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
        onSubmit={handleSubmit}
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
        <div className='mt-4 btn btn-primary'>
          <SpinnerButton loading={loading} text='login' />
        </div>
        <div className='btn btn-secondary'>
          <SpinnerButton loading={loading} text='guest user' />
        </div>
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

// TODO: connect this to a backend
