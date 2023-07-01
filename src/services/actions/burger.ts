import { api } from "../../utils/api";

import {
  ADD_INGR,
  DELETE_INGR,
  MOVE_INGR,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  SET_ORDER_REQUEST,
  SET_ORDER_FAILED,
  SET_ORDER_SUCCESS,
  CLEAR_ORDER,
} from "../constants";
import { AppDispatch, AppThunk } from "../types";

import { IIngredient } from "../types/data";

export interface IGetItemsRequest {
  readonly type: typeof GET_ITEMS_REQUEST;
}

export interface IGetItemsFailed {
  readonly type: typeof GET_ITEMS_FAILED;
}

export interface IGetItemsSuccess {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly items: Array<IIngredient>;
}

export interface ISetOrderRequest {
  readonly type: typeof SET_ORDER_REQUEST;
}

export interface ISetOrderFailed {
  readonly type: typeof SET_ORDER_FAILED;
}

export interface ISetOrderSuccess {
  readonly type: typeof SET_ORDER_SUCCESS;
  readonly order: number;
}

export interface IAddIngredient {
  readonly type: typeof ADD_INGR;
  readonly ingr: IIngredient;
}

export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGR;
  readonly ingr: number;
}

export interface IClearOrder {
  readonly type: typeof CLEAR_ORDER;
}

export interface IMoveIngredient {
  readonly type: typeof MOVE_INGR;
  readonly data: Array<IIngredient>;
}

export type TBurgerActions =
  | IGetItemsRequest
  | IGetItemsSuccess
  | IGetItemsFailed
  | ISetOrderRequest
  | ISetOrderSuccess
  | ISetOrderFailed
  | IAddIngredient
  | IDeleteIngredient
  | IMoveIngredient
  | IClearOrder;

export const addIngrAction = (ingr: IIngredient): IAddIngredient => ({
  type: ADD_INGR,
  ingr: ingr,
});

export const deleteIngrAction = (ingr: number): IDeleteIngredient => ({
  type: DELETE_INGR,
  ingr: ingr,
});

export const clearOrderAction = (): IClearOrder => ({
  type: CLEAR_ORDER,
});

export const moveIngrAction = (data: Array<IIngredient>): IMoveIngredient => ({
  type: MOVE_INGR,
  data: data,
});

export const getItemsAction = (): IGetItemsRequest => ({
  type: GET_ITEMS_REQUEST,
});

export const getItemsFailed = (): IGetItemsFailed => ({
  type: GET_ITEMS_FAILED,
});

export const getItemsSuccess = (
  items: Array<IIngredient>
): IGetItemsSuccess => ({
  type: GET_ITEMS_SUCCESS,
  items: items,
});

export const getIngredients = () => (dispatch: AppDispatch) => {
  dispatch(getItemsAction());
  api
    .getData()
    .then((res) => {
      dispatch(getItemsSuccess(res.data));
    })
    .catch(() => {
      dispatch(getItemsFailed());
    });
};

export const setOrder: AppThunk =
  (arr: ReadonlyArray<string>) => (dispatch: AppDispatch) => {
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
