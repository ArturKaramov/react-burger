import {
  WS_START_CONNECTION,
  WS_CLOSE_CONNECTION,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
} from "../constants";
import { TWSResponse } from "../types/data";

export interface IStartConnection {
  readonly type: typeof WS_START_CONNECTION;
  readonly payload?: string;
}

export const wsStartAction = (): IStartConnection => ({
  type: WS_START_CONNECTION,
});

export interface ICloseConnection {
  readonly type: typeof WS_CLOSE_CONNECTION;
}

export const wsCloseAction = (): ICloseConnection => ({
  type: WS_CLOSE_CONNECTION,
});

export interface IConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IConnectionMessage {
  readonly type: typeof WS_GET_ORDERS;
  readonly payload: TWSResponse;
}

export type TFeedActions =
  | IStartConnection
  | ICloseConnection
  | IConnectionClosed
  | IConnectionError
  | IConnectionSuccess
  | IConnectionMessage;
