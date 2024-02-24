import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const useHandleErrors = (errors: string[]) => {
  useEffect(() => {
    errors?.forEach((error: string) => toast.error(error));
  }, [errors]);
};
