import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useAppSelector } from '../hooks/reduxHooks';
import { RootState } from '../state/store/store';

export const useHandleErrors = () => {
  const errors = useAppSelector((state: RootState) => state.user.errors);

  useEffect(() => {
    errors?.forEach((error: string) => toast.error(error));
  }, [errors]);
};

// TODO: next: bugfix: it always returns generic errors
