import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILED,
  LOGOUT,
  PASS_REQUEST,
  PASS_SUCCESS,
  PASS_FAILED,
  NEW_PASS_REQUEST,
  NEW_PASS_SUCCESS,
  NEW_PASS_FAILED,
} from "../actions/user";

const initialState = {
  authRequest: false,
  authFailed: false,
  authSuccess: false,
  passRequest: false,
  passFailed: false,
  passSuccess: false,
  newPassRequest: false,
  newPassFailed: false,
  newPassSuccess: false,
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
    case PASS_REQUEST: {
      return {
        ...state,
        passRequest: true,
      };
    }
    case PASS_SUCCESS: {
      return {
        ...state,
        passRequest: false,
        passSuccess: true,
        passFailed: false,
      };
    }
    case PASS_FAILED: {
      return {
        ...state,
        passRequest: false,
        passFailed: true,
        passSuccess: false,
      };
    }
    case NEW_PASS_REQUEST: {
      return {
        ...state,
        passSuccess: false,
        newPassRequest: true,
      };
    }
    case NEW_PASS_SUCCESS: {
      return {
        ...state,
        newPassRequest: false,
        newPassSuccess: true,
        newPassFailed: false,
      };
    }
    case NEW_PASS_FAILED: {
      return {
        ...state,
        newPassRequest: false,
        newPassFailed: true,
        newPassSuccess: false,
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
