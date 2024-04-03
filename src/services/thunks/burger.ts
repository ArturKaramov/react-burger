import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';

export const getIngredients = createAsyncThunk('burger/getIngredients', api.getData.bind(api));

export const setOrder = createAsyncThunk('burger/setOrder', async (arr: Array<string>) =>
  api.createOrder(arr),
);
