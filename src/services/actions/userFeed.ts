import {
  WS_USERFEED_CONNECTION_START,
  WS_USERFEED_CLOSE_CONNECTION,
  WS_USERFEED_CONNECTION_CLOSED,
  WS_USERFEED_CONNECTION_ERROR,
  WS_USERFEED_CONNECTION_SUCCESS,
  WS_USERFEED_GET_ORDERS,
} from "../constants";
import { TWSResponse } from "../types/data";

export interface IStartUserConnection {
  readonly type: typeof WS_USERFEED_CONNECTION_START;
  readonly payload: string;
}

export const wsUserStartAction = (payload: string): IStartUserConnection => ({
  type: WS_USERFEED_CONNECTION_START,
  payload: payload,
});

export interface ICloseUserConnection {
  readonly type: typeof WS_USERFEED_CLOSE_CONNECTION;
}

export const wsUserCloseAction = (): ICloseUserConnection => ({
  type: WS_USERFEED_CLOSE_CONNECTION,
});

export interface IUserConnectionClosed {
  readonly type: typeof WS_USERFEED_CONNECTION_CLOSED;
}

export interface IUserConnectionError {
  readonly type: typeof WS_USERFEED_CONNECTION_ERROR;
}

export interface IUserConnectionSuccess {
  readonly type: typeof WS_USERFEED_CONNECTION_SUCCESS;
}

export interface IUserConnectionMessage {
  readonly type: typeof WS_USERFEED_GET_ORDERS;
  readonly payload: TWSResponse;
}

export type TUserFeedActions =
  | IStartUserConnection
  | ICloseUserConnection
  | IUserConnectionClosed
  | IUserConnectionError
  | IUserConnectionSuccess
  | IUserConnectionMessage;

export const startUserConnectionAction = (
  payload: string
): IStartUserConnection => ({
  type: WS_USERFEED_CONNECTION_START,
  payload: payload,
});
