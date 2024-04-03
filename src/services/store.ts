import { rootReducer } from './slices';
import { socketMiddleware } from './middleware/socket';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  wsClose,
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionSuccess,
  wsGetOrders,
  wsInit,
} from './slices/feed';
import {
  wsUserClose,
  wsUserFeedConnectionClosed,
  wsUserFeedConnectionError,
  wsUserFeedConnectionSuccess,
  wsUserFeedGetOrders,
  wsUserInit,
} from './slices/userFeed';
import { TWSActions } from './types';

const wsUrl: string = 'wss://norma.nomoreparties.space/orders/all';
const wsUrlUser: string = 'wss://norma.nomoreparties.space/orders';

const wsActions: TWSActions = {
  wsInit: wsInit,
  wsClose: wsClose,
  onOpen: wsConnectionSuccess,
  onClose: wsConnectionClosed,
  onError: wsConnectionError,
  onMessage: wsGetOrders,
};

const wsActionsUser: TWSActions = {
  wsInit: wsUserInit,
  wsClose: wsUserClose,
  onOpen: wsUserFeedConnectionSuccess,
  onClose: wsUserFeedConnectionClosed,
  onError: wsUserFeedConnectionError,
  onMessage: wsUserFeedGetOrders,
};

export const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(wsUrl, wsActions),
      socketMiddleware(wsUrlUser, wsActionsUser),
    ),
});
