import { combineReducers } from "redux";

import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  SHOW_DETAILS,
  SET_ORDER,
  ADD_INGR,
  DELETE_INGR,
  MOVE_INGRS,
} from "../actions";

const initialState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  items: [],
  constructor: [],
  details: {},
  order: 0,
};

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_ITEMS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredientsRequest: false,
        items: action.items,
      };
    }
    case SHOW_DETAILS: {
      return {
        ...state,
        details: action.item,
      };
    }
    case SET_ORDER: {
      return {
        ...state,
        order: action.order,
      };
    }
    case ADD_INGR: {
      return {
        ...state,
        constructor:
          action.ingr.type === "bun"
            ? [
                action.ingr,
                ...state.constructor.filter((item) => item.type !== "bun"),
                action.ingr,
              ]
            : [
                ...state.constructor.slice(0, -1),
                action.ingr,
                state.constructor[0],
              ],
      };
    }
    case DELETE_INGR: {
      return {
        ...state,
        constructor: [
          ...state.constructor.slice(0, action.ingr),
          ...state.constructor.slice(action.ingr + 1),
        ],
      };
    }
    case MOVE_INGRS: {
      return {
        ...state,
        constructor: action.data,
      };
    }
    default: {
      return state;
    }
  }
};

const cartReducer = {};

export const rootReducer = combineReducers({
  burger: burgerReducer,
  cart: cartReducer,
});
