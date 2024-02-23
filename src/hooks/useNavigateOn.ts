import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../state/store/store';

import { useAppSelector } from './reduxHooksWrapper';

interface NavigateOnProps {
  to: string;
  userStatus: 'registeredUser' | 'userLoggedIn';
}

export const useNavigateOn = ({ to, userStatus }: NavigateOnProps) => {
  const navigate = useNavigate();
  const userState = useAppSelector(
    (state: RootState) => state.user[userStatus]
  );

  useEffect(() => {
    if (userState) {
      navigate(to);
    }
  }, [userState, navigate, to]);
};
