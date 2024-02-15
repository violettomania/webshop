import { Link } from 'react-router-dom';
import { RootState } from '../store/store';
import { useAppSelector } from '../hooks/hooks';

export default function CartNavigation() {
  const registeredUser = useAppSelector(
    (state: RootState) => state.user.registeredUser
  );

  return (
    <>
      {registeredUser ? (
        <Link className='btn btn-primary btn-block mt-8' to='/checkout'>
          proceed to checkout
        </Link>
      ) : (
        <Link className='btn btn-primary btn-block mt-8' to='/login'>
          please login
        </Link>
      )}
    </>
  );
}
