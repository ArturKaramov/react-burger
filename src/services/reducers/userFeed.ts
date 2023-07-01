import { TUserFeedActions } from "../actions/userFeed";
import {
  WS_USERFEED_CONNECTION_ERROR,
  WS_USERFEED_CONNECTION_SUCCESS,
  WS_USERFEED_CONNECTION_CLOSED,
  WS_USERFEED_GET_ORDERS,
} from "../constants";
import { IOrder } from "../types/data";

export type TUserFeedState = {
  wsConnected: boolean;
  orders: ReadonlyArray<IOrder>;
};

const initialState: TUserFeedState = {
  wsConnected: false,
  orders: [],
};

export const wsUserFeedReducer = (
  state = initialState,
  action: TUserFeedActions
): TUserFeedState => {
  switch (action.type) {
    case WS_USERFEED_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
      };
    }
    case WS_USERFEED_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
      };
    }
    case WS_USERFEED_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false,
        orders: initialState.orders,
      };
    }
    case WS_USERFEED_GET_ORDERS: {
      return {
        ...state,
        orders: action.payload.orders,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
