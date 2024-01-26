export default function App() {
  return (
    <header className='bg-neutral py-2 text-neutral-content'>
      <div className='align-element flex justify-center sm:justify-end'>
        <div className='flex gap-x-6 justify-center items-center'>
          <a className='link link-hover text-xs sm:text-sm' href='/login'>
            Sign in / Guest
          </a>
          <a className='link link-hover text-xs sm:text-sm' href='/register'>
            Create Account
          </a>
        </div>
      </div>
    </header>
  );
}
