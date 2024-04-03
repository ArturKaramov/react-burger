import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IOrder } from '../types';

export type TFeedState = {
  wsConnected: boolean;
  orders: ReadonlyArray<IOrder>;
  total: number;
  totalToday: number;
};

const initialState: TFeedState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    wsInit: () => {},
    wsClose: () => {},
    wsConnectionSuccess: (state: TFeedState) => {
      state.wsConnected = true;
    },
    wsConnectionError: (state: TFeedState) => {
      state.wsConnected = false;
    },
    wsConnectionClosed: (state: TFeedState) => {
      state.wsConnected = false;
    },
    wsGetOrders: (state: TFeedState, action: PayloadAction<Omit<TFeedState, 'wsConnected'>>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    default: (state: TFeedState) => {
      return state;
    },
  },
});

export const {
  wsInit,
  wsClose,
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionSuccess,
  wsGetOrders,
} = feedSlice.actions;

export default feedSlice.reducer;
