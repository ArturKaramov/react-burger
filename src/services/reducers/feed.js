import {
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from "../actions/feed";

const initialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const wsFeedReducer = (state = initialState, action) => {
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
      //проверка на наличие null в списке ингридиентов, т.к. попадались такие
      action.payload.orders.map((order) => {
        let arr = [];
        for (let i = 0; i < order.ingredients.length; i++) {
          if (order.ingredients[i]) {
            arr.push(order.ingredients[i]);
          }
        }
        order.ingredients = arr;
      });

      return {
        ...state,
        orders: [...action.payload.orders],
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
