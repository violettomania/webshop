import { createAsyncThunk } from '@reduxjs/toolkit';
import { config } from './config/config';
import { RegistrationError } from '../util/RegistrationError';
import { User } from './registerUser';

export interface LoginErrorResponse {
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

const url = config.loginUrl;

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user: { identifier: string; password: string }) => {
    console.log('user', user);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const resp: Response = await response.json();
      if (resp.error) {
        throw new RegistrationError(resp.error);
      }
      return { jwt: resp.jwt, user: resp.user };
    } catch (error) {
      throw error;
    }
  }
);
