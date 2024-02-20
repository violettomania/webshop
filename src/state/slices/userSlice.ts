import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import { RegisteredUser, registerUser } from '../actions/registerUser';
import { loginUser } from '../actions/loginUser';

interface UserState {
  registeredUser: RegisteredUser | null;
  userLoggedIn: boolean;
  loading: boolean;
  errors?: string[];
}

const initialState: UserState = {
  registeredUser: null,
  userLoggedIn: false,
  loading: false,
  errors: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.registeredUser = null;
      state.userLoggedIn = false;
    },
    setUser: (state, action) => {
      state.registeredUser = action.payload;
      state.userLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.userLoggedIn = false;
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registeredUser = action.payload;
        state.userLoggedIn = false;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.errors = action.error.message
          ? JSON.parse(action.error.message)
          : ['An error occurred'];
        state.userLoggedIn = false;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.registeredUser = action.payload;
        state.userLoggedIn = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.errors = action.error.message
          ? JSON.parse(action.error.message)
          : ['An error occurred'];
        state.userLoggedIn = false;
        state.loading = false;
      });
  },
});

export const { logoutUser, setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.registeredUser;

export default userSlice.reducer;
