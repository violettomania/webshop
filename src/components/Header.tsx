import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-neutral py-2 text-neutral-content'>
      <div className='align-element flex justify-center sm:justify-end'>
        <div className='flex gap-x-6 justify-center items-center'>
          <Link className='link link-hover text-xs sm:text-sm' to='/login'>
            Sign in / Guest
          </Link>
          <Link className='link link-hover text-xs sm:text-sm' to='/register'>
            Create Account
          </Link>
        </div>
      </div>
    </header>
  );
}

// const renderLoggedInUserHeader = () => {
//   return (
//     <header className='bg-neutral py-2 text-neutral-content'>
//       <div className='align-element flex justify-center sm:justify-end'>
//         <div className='flex gap-x-2 sm:gap-x-8 items-center'>
//           <p className='text-xs sm:text-sm'>Hello, demo user</p>
//           <button className='btn btn-xs btn-outline btn-primary'>logout</button>
//         </div>
//       </div>
//     </header>
//   );
// };
