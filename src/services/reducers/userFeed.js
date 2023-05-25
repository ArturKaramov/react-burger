import {
  WS_USERFEED_CONNECTION_ERROR,
  WS_USERFEED_CONNECTION_START,
  WS_USERFEED_CONNECTION_SUCCESS,
  WS_USERFEED_CONNECTION_CLOSED,
  WS_USERFEED_GET_ORDERS,
} from "../actions/userFeed";

const initialState = {
  wsConnected: false,
  orders: [],
};

export const wsUserFeedReducer = (state = initialState, action) => {
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
        orders: action.payload.orders.reverse(),
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
