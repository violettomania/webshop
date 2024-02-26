import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { RegistrationError } from '../../util/RegistrationError';

import { config } from './config/config';

interface Response {
  jwt: string;
  user: User;
  error: RegistrationErrorResponse;
}

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user: { username: string; email: string; password: string }) => {
    const {
      data: { jwt, user: userData, error },
    }: { data: Response } = await axios.post(config.registerUrl, user);
    if (error) {
      throw new RegistrationError(error);
    }
    return { jwt, user: userData } as RegisteredUser;
  }
);
