import {
  WS_START_CONNECTION,
  WS_CLOSE_CONNECTION,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  WS_USERFEED_CLOSE_CONNECTION,
  WS_USERFEED_CONNECTION_CLOSED,
  WS_USERFEED_CONNECTION_ERROR,
  WS_USERFEED_CONNECTION_START,
  WS_USERFEED_CONNECTION_SUCCESS,
  WS_USERFEED_GET_ORDERS,
} from "../constants";

export type TInputValue = {
  [key: string]: string;
};

export interface IIngredient {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: string;
  key?: string;
  [k: string]: string | number | undefined;
}

export type TAuthResponse = {
  readonly success: boolean;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly user: { readonly email: string; readonly name: string };
};

export interface IOrder {
  readonly ingredients: ReadonlyArray<string>;
  readonly name: string;
  readonly _id: string;
  readonly status: string;
  readonly number: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export type TWSResponse = {
  readonly success: boolean;
  readonly orders: ReadonlyArray<IOrder>;
  readonly total: number;
  readonly totalToday: number;
};

export type TWSActions = {
  wsInit: typeof WS_START_CONNECTION | typeof WS_USERFEED_CONNECTION_START;
  wsClose: typeof WS_CLOSE_CONNECTION | typeof WS_USERFEED_CLOSE_CONNECTION;
  onOpen: typeof WS_CONNECTION_SUCCESS | typeof WS_USERFEED_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED | typeof WS_USERFEED_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR | typeof WS_USERFEED_CONNECTION_ERROR;
  onMessage: typeof WS_GET_ORDERS | typeof WS_USERFEED_GET_ORDERS;
};
