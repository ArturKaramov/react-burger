import { Middleware, MiddlewareAPI } from "redux";
import { TFeedActions } from "../actions/feed";
import { TUserFeedActions } from "../actions/userFeed";
import { TWSActions } from "../types/data";
import { AppDispatch, RootState } from "../types/index";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: TWSActions
): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    return (next: AppDispatch) => (action: TFeedActions | TUserFeedActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, wsClose, onOpen, onClose, onError, onMessage } =
        wsActions;

      if (type === wsInit && action.payload) {
        socket = new WebSocket(`${wsUrl}?token=${action.payload}`);
      } else if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}`);
      }

      if (socket && type === wsClose) {
        socket.close(1000, "page_was_closed");
      }

      if (socket) {
        socket.onopen = (e) => {
          dispatch({ type: onOpen, payload: e });
        };

        socket.onerror = (e) => {
          dispatch({ type: onError, payload: e });
        };

        socket.onmessage = (e) => {
          const { data } = e;
          const parsedData = JSON.parse(data);
          const { success, ...restData } = parsedData;

          dispatch({ type: onMessage, payload: restData });
        };

        socket.onclose = (e) => {
          dispatch({ type: onClose, payload: e });
        };
      }

      next(action);
    };
  };
};
