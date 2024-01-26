export default function Register() {
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
            <span className='label-text capitalize'>email</span>
          </label>
          <input
            type='email'
            name='identifier'
            className='input input-bordered undefined'
            value=''
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
            value=''
          />
        </div>
        <div className='mt-4'>
          <button type='submit' className='btn btn-primary btn-block'>
            login
          </button>
        </div>
        <button type='button' className='btn btn-secondary btn-block'>
          guest user
        </button>
        <p className='text-center'>
          Not a member yet?{' '}
          <a
            className='ml-2 link link-hover link-primary capitalize'
            href='/register'
          >
            register
          </a>
        </p>
      </form>
    </section>
  );
}

// TODO: connect this to a backend
