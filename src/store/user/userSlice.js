import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { handlePending, handleRejected, handleFulfilled } from './handles';
import {
  loginThunk,
  logoutThunk,
  signUpThunk,
  getUserInfoThunk,
  patchUserInfoThunk,
  patchUserAvatarThunk,
  getCurrentThunk,
} from './thunk';

import { getActions } from './servises/getActions';

const initialState = {
  token: null,
  profile: { name: '', email: '', gender: '', avatarURL: '' },
  isLogined: false,
  isRefreshing: false,
  hasError: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signUpThunk.fulfilled, (state, { payload }) => {
        state.token = payload.token;
      })

      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.profile = payload;
        state.token = payload.token;
      })

      .addCase(logoutThunk.fulfilled, () => {
        return { ...initialState };
      })

      .addCase(getUserInfoThunk.fulfilled, (state, { payload }) => {
        state.profile = payload;
      })

      .addCase(patchUserInfoThunk.fulfilled, (state, { payload }) => {
        state.profile = payload;
      })

      .addCase(patchUserAvatarThunk.fulfilled, (state, { payload }) => {
        state.profile.avatarURL = payload.avatarURL;
      })
      .addCase(getCurrentThunk.fulfilled, (state, { payload }) => {
        state.profile = payload.data;
        state.isLogined = true;
      })

      .addMatcher(isAnyOf(...getActions('pending')), handlePending)
      .addMatcher(isAnyOf(...getActions('fulfilled')), handleFulfilled)
      .addMatcher(isAnyOf(...getActions('rejected')), handleRejected);
  },
});

export const usersReducer = usersSlice.reducer;
