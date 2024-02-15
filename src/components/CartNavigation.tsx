import { Link } from 'react-router-dom';
import { RootState } from '../store/store';
import { useAppSelector } from '../hooks/hooks';

export default function CartNavigation() {
  const registeredUser = useAppSelector(
    (state: RootState) => state.user.registeredUser
  );

  return (
    <div className='lg:col-span-4 lg:pl-4'>
      {registeredUser ? (
        <Link className='btn btn-primary btn-block mt-8' to='/checkout'>
          PROCEED TO CHECKOUT
        </Link>
      ) : (
        <Link className='btn btn-primary btn-block mt-8' to='/login'>
          PLEASE LOGIN
        </Link>
      )}
    </div>
  );
}
