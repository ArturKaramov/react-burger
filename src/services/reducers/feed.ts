import { TFeedActions } from "../actions/feed";
import {
  WS_CONNECTION_ERROR,
  WS_START_CONNECTION,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from "../constants";
import { IOrder } from "../types/data";

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

export const wsFeedReducer = (
  state = initialState,
  action: TFeedActions
): TFeedState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false,
        orders: initialState.orders,
      };
    }
    case WS_GET_ORDERS: {
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
