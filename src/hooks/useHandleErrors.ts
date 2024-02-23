import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { RootState } from '../state/store/store';

import { useAppSelector } from './reduxHooksWrapper';

export const useHandleErrors = () => {
  const errors = useAppSelector((state: RootState) => state.user.errors);

  useEffect(() => {
    errors?.forEach((error: string) => toast.error(error));
  }, [errors]);
};

// TODO: next: bugfix: it always returns generic errors
