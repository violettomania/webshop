import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer, REHYDRATE } from 'redux-persist';
import type { RootState } from '../store/store';
import { registerUser } from '../actions/registerUser';
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
      console.log('logout user');
      state.registeredUser = null;
      state.userLoggedIn = false;
      state.loading = false;
    },
    setUser: (state, action) => {
      console.log('set user');
      state.registeredUser = action.payload;
      state.userLoggedIn = true;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        console.log('registering user');
        state.userLoggedIn = false;
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log('registered user');
        state.registeredUser = action.payload;
        state.userLoggedIn = false;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log('registering user failed');
        state.errors = action.error.message
          ? JSON.parse(action.error.message)
          : ['An error occurred'];
        state.userLoggedIn = false;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        console.log('logging in user');
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('logged in user');
        state.registeredUser = action.payload;
        state.userLoggedIn = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('logging in user failed');
        // TODO: next: this one causes problems if we try to login with an empty form
        console.log(action.error, state);
        state.errors = action.error.message
          ? JSON.parse(action.error.message)
          : ['An error occurred'];
        state.userLoggedIn = false;
        state.loading = false;
      })
      .addDefaultCase((state, action) => {
        if (action.type === 'persist/REHYDRATE') {
          state.loading = false;
        }
      });
  },
});

export const { logoutUser, setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.registeredUser;

export default userSlice.reducer;
