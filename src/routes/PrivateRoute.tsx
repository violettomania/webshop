import { useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../hooks/reduxHooks';
import { RootState } from '../state/store/store';

interface PrivateRouteProps {
  path: string;
  children: React.ReactNode;
}

function PrivateRoute({ children, path }: PrivateRouteProps) {
  const userLoggedIn = useAppSelector(
    (state: RootState) => state.user.userLoggedIn
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate('/');
    }
  }, [userLoggedIn, navigate]);

  return userLoggedIn ? <Route path={path}>{children}</Route> : null;
}

export default PrivateRoute;
