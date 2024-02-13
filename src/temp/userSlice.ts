import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import {
  RegisteredUser,
  registerUser,
} from '../actions/registerUser';
import { RegistrationError } from '../util/RegistrationError';

interface UserState {
  registeredUser: RegisteredUser | null;
  loading: boolean;
  errors?: string[];
}

const initialState: UserState = {
  registeredUser: null,
  loading: false,
  errors: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registeredUser = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        if (action.error instanceof RegistrationError) {
          state.errors = action.error.errorMessages;
        } else {
          state.errors = action.error.message ? [action.error.message] : ['An error occurred'];
        }
        state.loading = false;
      });
  },
});

export const selectUser = (state: RootState) => state.user.registeredUser;

export default userSlice.reducer;
