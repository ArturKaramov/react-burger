import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./reducers";
import { socketMiddleware } from "./middleware/socket";
import {
  WS_CONNECTION_ERROR,
  WS_START_CONNECTION,
  WS_CLOSE_CONNECTION,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_USERFEED_CONNECTION_ERROR,
  WS_USERFEED_CLOSE_CONNECTION,
  WS_USERFEED_CONNECTION_CLOSED,
  WS_USERFEED_CONNECTION_START,
  WS_USERFEED_CONNECTION_SUCCESS,
  WS_USERFEED_GET_ORDERS,
} from "./constants";
import { TWSActions } from "./types/data";
import thunk from "redux-thunk";

const wsUrl: string = "wss://norma.nomoreparties.space/orders/all";
const wsUrlUser: string = "wss://norma.nomoreparties.space/orders";

const wsActions: TWSActions = {
  wsInit: WS_START_CONNECTION,
  wsClose: WS_CLOSE_CONNECTION,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS,
};

const wsActionsUser: TWSActions = {
  wsInit: WS_USERFEED_CONNECTION_START,
  wsClose: WS_USERFEED_CLOSE_CONNECTION,
  onOpen: WS_USERFEED_CONNECTION_SUCCESS,
  onClose: WS_USERFEED_CONNECTION_CLOSED,
  onError: WS_USERFEED_CONNECTION_ERROR,
  onMessage: WS_USERFEED_GET_ORDERS,
};

const composeEnhancers =
  typeof window === "object" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(wsUrl, wsActions),
    socketMiddleware(wsUrlUser, wsActionsUser)
  )
);

export const store = createStore(rootReducer, enhancer);
