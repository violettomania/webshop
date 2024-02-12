import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { RootState } from '../store/store';
import { registerUser } from '../actions/registerUser';
import { useState } from 'react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const user = useAppSelector((state: RootState) => state.user.registeredUser);
  const loading = useAppSelector((state: RootState) => state.user.loading);
  // TODO: handle errors

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser({ username, email, password }));
    setUsername('');
    setEmail('');
    setPassword('');
  };

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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='mt-4'>
          <button type='submit' className='btn btn-primary btn-block'>
            register
          </button>
        </div>
        <p className='text-center'>
          Already a member?
          <a
            className='ml-2 link link-hover link-primary capitalize'
            href='/login'
          >
            login
          </a>
        </p>
      </form>
    </section>
  );
}

// TODO: connect this to a backend
