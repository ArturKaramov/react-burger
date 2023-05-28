import { applyMiddleware, createStore, compose } from "redux";
import { rootReducer } from "./reducers";
import { socketMiddleware } from "./middleware/socket";
import thunkMiddleware from "redux-thunk";
import {
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CLOSE_CONNECTION,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from "./actions/feed";
import {
  WS_USERFEED_CONNECTION_ERROR,
  WS_USERFEED_CLOSE_CONNECTION,
  WS_USERFEED_CONNECTION_CLOSED,
  WS_USERFEED_CONNECTION_START,
  WS_USERFEED_CONNECTION_SUCCESS,
  WS_USERFEED_GET_ORDERS,
} from "./actions/userFeed";
import { composeWithDevTools } from "redux-devtools-extension";

const wsUrl = "wss://norma.nomoreparties.space/orders/all";

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CLOSE_CONNECTION,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS,
};

const wsUrlUser = "wss://norma.nomoreparties.space/orders";

const wsActionsUser = {
  wsInit: WS_USERFEED_CONNECTION_START,
  wsClose: WS_USERFEED_CLOSE_CONNECTION,
  onOpen: WS_USERFEED_CONNECTION_SUCCESS,
  onClose: WS_USERFEED_CONNECTION_CLOSED,
  onError: WS_USERFEED_CONNECTION_ERROR,
  onMessage: WS_USERFEED_GET_ORDERS,
};

export const store = (initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware,
        socketMiddleware(wsUrl, wsActions),
        socketMiddleware(wsUrlUser, wsActionsUser)
      )
    )
  );
