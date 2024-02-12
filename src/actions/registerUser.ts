import { createAsyncThunk } from '@reduxjs/toolkit';
import { config } from './config/config';

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

interface ErrorResponse {
  message: string;
  details: {
    errors?: [{ message?: string }];
  };
}

interface Response {
  data: RegisteredUser;
  error: ErrorResponse;
}

// TODO: move this to a separate file
export class RegistrationError extends Error {
  public errorMessages: string[];
  constructor(public originalError: ErrorResponse) {
    super(originalError.message);
    if (originalError.details && originalError.details.errors) {
      this.errorMessages = originalError.details.errors.map(
        (error) => error.message || ''
      );
    } else {
      this.errorMessages = [originalError.message];
    }
  }
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
