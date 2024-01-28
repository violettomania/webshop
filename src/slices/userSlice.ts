import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';

interface UserState {
  user: {
    id: string;
  };
}

const initialState: UserState = {
  user: {
    id: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    test: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { test } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
