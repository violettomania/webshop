export default function Login() {
  return (
    <section className='h-screen grid place-items-center'>
      <form
        method='post'
        action='/register'
        className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
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
            value=''
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
