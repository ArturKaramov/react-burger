import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';

import { IOrder } from '../types/data';
import { TFeedState } from './feed';

export type TUserFeedState = {
  wsConnected: boolean;
  orders: ReadonlyArray<IOrder>;
};

const initialState: TUserFeedState = {
  wsConnected: false,
  orders: [],
};

type TUserFeedActions = {
  wsUserInit: ActionCreatorWithPayload<string>;
  wsUserClose: ActionCreatorWithoutPayload;
  wsUserFeedConnectionClosed: ActionCreatorWithoutPayload;
  wsUserFeedConnectionError: ActionCreatorWithoutPayload;
  wsUserFeedConnectionSuccess: ActionCreatorWithoutPayload;
  wsGetOrders: ActionCreatorWithPayload<Omit<TUserFeedState, 'wsConnected'>>;
};

export const userFeedSlice = createSlice({
  name: 'userFeed',
  initialState,
  reducers: {
    wsUserInit: (state: TUserFeedState, action: PayloadAction<string>) => {
      return state;
    },
    wsUserClose: () => {},
    wsUserFeedConnectionSuccess: (state: TUserFeedState) => {
      state.wsConnected = true;
    },
    wsUserFeedConnectionError: (state: TUserFeedState) => {
      state.wsConnected = false;
    },
    wsUserFeedConnectionClosed: (state: TUserFeedState) => {
      state.wsConnected = false;
      state.orders = initialState.orders;
    },
    wsUserFeedGetOrders: (
      state: TUserFeedState,
      action: PayloadAction<Omit<TFeedState, 'wsConnected'>>,
    ) => {
      state.orders = action.payload.orders;
    },
    default: (state: TUserFeedState) => {
      return state;
    },
  },
});

export const {
  wsUserInit,
  wsUserClose,
  wsUserFeedConnectionSuccess,
  wsUserFeedConnectionError,
  wsUserFeedConnectionClosed,
  wsUserFeedGetOrders,
} = userFeedSlice.actions;

export default userFeedSlice.reducer;
