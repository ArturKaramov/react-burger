import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  SET_ORDER_REQUEST,
  SET_ORDER_FAILED,
  SET_ORDER_SUCCESS,
  CLEAR_ORDER,
  SHOW_DETAILS,
  CLEAR_DETAILS,
  ADD_INGR,
  DELETE_INGR,
  MOVE_INGRS,
} from "../actions/burger";

const initialState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  orderRequest: false,
  orderFailed: false,
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
    case CLEAR_ORDER: {
      return {
        ...state,
        order: initialState.order,
        constructor: initialState.constructor,
      };
    }
    case SHOW_DETAILS: {
      return {
        ...state,
        details: action.item,
      };
    }
    case CLEAR_DETAILS: {
      return {
        ...state,
        details: initialState.details,
      };
    }
    case SET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case SET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      };
    }
    case SET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
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
