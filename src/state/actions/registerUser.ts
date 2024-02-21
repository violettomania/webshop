import { createAsyncThunk } from '@reduxjs/toolkit';
import { config } from './config/config';
import { RegistrationError } from '../../util/RegistrationError';
import axios from 'axios';

// TODO: move to common file
export interface User {
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

export interface RegistrationErrorResponse {
  message: string;
  details: {
    errors?: [{ message?: string }];
  };
}

interface Response {
  jwt: string;
  user: User;
  error: RegistrationErrorResponse;
}

// TODO: check options preflight
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user: { username: string; email: string; password: string }) => {
    const {
      data: { jwt, user: userData, error },
    }: { data: Response } = await axios.post(config.registerUrl, user);
    if (error) {
      throw new RegistrationError(error);
    }
    return { jwt, user: userData };
  }
);
