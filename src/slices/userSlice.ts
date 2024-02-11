import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import { RegisteredUser, registerUser } from '../actions/registerUser';

interface UserState {
  registeredUser: RegisteredUser | null;
  loading: boolean;
  error?: string;
}

const initialState: UserState = {
  registeredUser: null,
  loading: false,
  error: '',
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
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const selectUser = (state: RootState) => state.user.registeredUser;

export default userSlice.reducer;
