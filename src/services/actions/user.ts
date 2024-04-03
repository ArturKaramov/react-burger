import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';

export const loginUser = createAsyncThunk(
  'user/login',
  async (obj: { email: string; password: string }) => api.loginUser(obj),
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (obj: { email: string; password: string; name: string }) => api.createUser(obj),
);

export const logoutUser = createAsyncThunk('user/logout', async () => api.logoutUser());

export const updateUser = createAsyncThunk(
  'user/update',
  async (obj: { email: string; password: string; name: string }) => api.updateUserInfo(obj),
);

export const getUserInfo = createAsyncThunk('user/getInfo', api.getUserInfo.bind(api));

export const resetPassword = createAsyncThunk('user/forgot', async (obj: { email: string }) =>
  api.resetPassword(obj),
);

export const createNewPassword = createAsyncThunk(
  'user/reset',
  async (obj: { password: string; token: string }) => api.createNewPassword(obj),
);
