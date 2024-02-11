import { createAsyncThunk } from '@reduxjs/toolkit';

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

const url = 'https://strapi-store-server.onrender.com/api/auth/local/register';

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
      const data: RegisteredUser = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
