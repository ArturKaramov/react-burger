import { api } from "../../utils/api";

export const SHOW_DETAILS = "SHOW_DETAILS";
export const CLEAR_DETAILS = "CLEAR_DETAILS";
export const ADD_INGR = "ADD_INGR";
export const DELETE_INGR = "DELETE_INGR";
export const MOVE_INGRS = "MOVE_INGRS";
export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILED = "GET_ITEMS_FAILED";
export const SET_ORDER_REQUEST = "SET_ORDER_REQUEST";
export const SET_ORDER_FAILED = "SET_ORDER_FAILED";
export const SET_ORDER_SUCCESS = "SET_ORDER_SUCCESS";
export const CLEAR_ORDER = "CLEAR_ORDER";

export function getIngredients() {
  return function (dispatch) {
    dispatch({ type: GET_ITEMS_REQUEST });
    api
      .getData()
      .then((res) => {
        dispatch({ type: GET_ITEMS_SUCCESS, items: res.data });
      })
      .catch(() => {
        dispatch({ type: GET_ITEMS_FAILED });
      });
  };
}

export function setOrder(arr) {
  return function (dispatch) {
    dispatch({ type: SET_ORDER_REQUEST });
    api
      .createOrder(arr)
      .then((res) => {
        dispatch({ type: SET_ORDER_SUCCESS, order: res.order.number });
      })
      .catch(() => {
        dispatch({ type: SET_ORDER_FAILED });
      });
  };
}
