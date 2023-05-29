export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;
    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsClose, onOpen, onClose, onError, onMessage } =
        wsActions;

      if (type === wsInit && payload) {
        socket = new WebSocket(`${wsUrl}?token=${payload}`);
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
