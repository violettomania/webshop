import { useEffect } from 'react';

import { useAppSelector } from '../hooks/reduxHooks';
import { RootState } from '../state/store/store';

export const useNavigateOnRegister = (
  navigate: (path: string) => void,
  path: string
) => {
  const registeredUser = useAppSelector(
    (state: RootState) => state.user.registeredUser
  );

  useEffect(() => {
    if (registeredUser) {
      navigate(path);
    }
  }, [registeredUser, navigate, path]);
};
