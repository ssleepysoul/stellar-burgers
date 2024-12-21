import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '@api';

import { TUser } from '@utils-types';
import { setCookie, deleteCookie } from '../utils/cookie';

type AuthState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: null | TUser;
  error: null | {};
  isLoading: boolean;
};

const initialState: AuthState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  error: null,
  isLoading: false
};

export const fetchRegisterUserApi = createAsyncThunk(
  'auth/fetchRegisterUserApi',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);

export const fetchLoginUserApi = createAsyncThunk(
  'auth/fetchLoginUserApi',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);

export const fetchForgotPasswordApi = createAsyncThunk(
  'auth/fetchForgotPasswordApi',
  async (data: { email: string }) => await forgotPasswordApi(data)
);

export const fetchResetPasswordApi = createAsyncThunk(
  'auth/fetchResetPasswordApi',
  async (data: { password: string; token: string }) =>
    await resetPasswordApi(data)
);

export const fetchGetUserApi = createAsyncThunk(
  'auth/fetchGetUserApi',
  async () => await getUserApi()
);

export const fetchLogoutApi = createAsyncThunk(
  'auth/fetchLogoutApi',
  async () => {
    const response = await logoutApi();
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
    return response;
  }
);

// @ts-ignore
const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetUserApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGetUserApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as null;
        state.isAuthChecked = true;
      })
      .addCase(fetchGetUserApi.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })

      .addCase(fetchRegisterUserApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRegisterUserApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as null;
        state.isAuthChecked = false;
      })
      .addCase(fetchRegisterUserApi.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })

      .addCase(fetchLoginUserApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLoginUserApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as null;
        state.isAuthChecked = true;
      })
      .addCase(fetchLoginUserApi.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })

      .addCase(fetchLogoutApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLogoutApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as null;
        state.isAuthChecked = true;
      })
      .addCase(fetchLogoutApi.fulfilled, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.error = null;
      })

      .addCase(fetchForgotPasswordApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchForgotPasswordApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as null;
        state.isAuthChecked = true;
      })
      .addCase(fetchForgotPasswordApi.fulfilled, (state, action) => {
        state.user = null;
        state.isLoading = true;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })

      .addCase(fetchResetPasswordApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchResetPasswordApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as null;
        state.isAuthChecked = true;
      })
      .addCase(fetchResetPasswordApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      });
  }
});

export default authSlice.reducer;
