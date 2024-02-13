import { createAsyncThunk } from '@reduxjs/toolkit';
import { config } from './config/config';
import { RegistrationError } from '../util/RegistrationError';

interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RegisteredUser {
  jwt: string;
  user: User;
}

export interface ErrorResponse {
  message: string;
  details: {
    errors?: [{ message?: string }];
  };
}

interface Response {
  data: RegisteredUser;
  error: ErrorResponse;
}

const url = config.registerUrl;

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user: { username: string; email: string; password: string }) => {
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
      return resp.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
