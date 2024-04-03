import { Middleware, MiddlewareAPI } from 'redux';
import { TWSActions } from '../types';
import { AppDispatch, RootState } from '../types/index';
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

export const socketMiddleware = (wsUrl: string, wsActions: TWSActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    return (next: AppDispatch) =>
      (action: ActionCreatorWithoutPayload | ActionCreatorWithPayload<any>) => {
        const { dispatch } = store;
        const { wsInit, wsClose, onOpen, onClose, onError, onMessage } = wsActions;

        if (wsInit.match(action) && action.payload) {
          socket = new WebSocket(`${wsUrl}?token=${action.payload}`);
        } else if (wsInit.match(action)) {
          socket = new WebSocket(`${wsUrl}`);
        }

        if (socket && wsClose.match(action)) {
          socket.close(1000, 'page_was_closed');
        }

        if (socket) {
          socket.onopen = () => {
            dispatch(onOpen());
          };

          socket.onerror = () => {
            dispatch(onError());
          };

          socket.onmessage = (e) => {
            const { data } = e;
            const parsedData = JSON.parse(data);
            const { success, ...restData } = parsedData;

            dispatch(onMessage(restData));
          };

          socket.onclose = () => {
            dispatch(onClose());
          };
        }

        next(action);
      };
  };
};
