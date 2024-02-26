import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { RegistrationError } from '../../util/RegistrationError';

import { config } from './config/config';

interface LoginErrorResponse {
  message: string;
  details: {
    errors?: [{ message?: string }];
  };
}

interface Response {
  jwt: string;
  user: User;
  error?: LoginErrorResponse;
}

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user: { identifier: string; password: string }) => {
    const {
      data: { jwt, user: userData, error },
    }: { data: Response } = await axios.post(config.loginUrl, user);
    if (error) {
      throw new RegistrationError(error);
    }
    return { jwt, user: userData } as RegisteredUser;
  }
);
