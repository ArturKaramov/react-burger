import { api } from "../../utils/api";

export const SHOW_DETAILS = "SHOW_DETAILS";
export const SET_ORDER = "SET_ORDER";
export const ADD_INGR = "ADD_INGR";
export const DELETE_INGR = "DELETE_INGR";
export const MOVE_INGRS = "MOVE_INGRS";
export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILED = "GET_ITEMS_FAILED";

export function getIngredients() {
  return function (dispatch) {
    dispatch({ type: GET_ITEMS_REQUEST });
    api.getData().then((res) => {
      if (res && res.success) {
        dispatch({ type: GET_ITEMS_SUCCESS, items: res.data });
      } else {
        dispatch({ type: GET_ITEMS_FAILED });
      }
    });
  };
}
