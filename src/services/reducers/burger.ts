import { INGRS } from '../../utils/data';
import { TBurgerActions } from '../actions/burger';
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  SET_ORDER_REQUEST,
  SET_ORDER_FAILED,
  SET_ORDER_SUCCESS,
  CLEAR_ORDER,
  ADD_INGR,
  DELETE_INGR,
  MOVE_INGR,
} from '../constants';
import { IIngredient } from '../types/data';

export type TBurgerState = {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  orderRequest: boolean;
  orderFailed: boolean;
  items: Array<IIngredient>;
  constructor: Array<IIngredient>;
  order: number;
};

const initialState: TBurgerState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  orderRequest: false,
  orderFailed: false,
  items: [],
  constructor: [],
  order: 0,
};

export const burgerReducer = (
  state: TBurgerState = initialState,
  action: TBurgerActions,
): TBurgerState => {
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
          action.ingr.type === INGRS.BUN
            ? [action.ingr, ...state.constructor.slice(1, -1), action.ingr]
            : [
                ...state.constructor.slice(0, -1),
                action.ingr,
                state.constructor[state.constructor.length - 1],
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
    case MOVE_INGR: {
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
