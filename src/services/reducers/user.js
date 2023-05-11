import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILED,
  LOGOUT,
  REFRESH_TOKEN,
} from "../actions/user";

const initialState = {
  authRequest: false,
  authFailed: false,
  authSuccess: false,
  user: {
    email: "",
    name: "",
  },
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST: {
      return {
        ...state,
        authRequest: true,
        authFailed: false,
        authSuccess: false,
      };
    }
    case AUTH_FAILED: {
      return {
        ...state,
        authRequest: false,
        authFailed: true,
        authSuccess: false,
      };
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        authRequest: false,
        authFailed: false,
        authSuccess: true,
        user: {
          email: action.data.user.email,
          name: action.data.user.name,
        },
      };
    }
    case REFRESH_TOKEN: {
      return {
        ...state,
      };
    }
    case LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
