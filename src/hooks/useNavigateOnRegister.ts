import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../hooks/reduxHooks';
import { RootState } from '../state/store/store';

export const useNavigateOnRegister = (path: string) => {
  const navigate = useNavigate();

  const registeredUser = useAppSelector(
    (state: RootState) => state.user.registeredUser
  );

  useEffect(() => {
    if (registeredUser) {
      navigate(path);
    }
  }, [registeredUser, navigate, path]);
};
