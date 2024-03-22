import { TUserActions } from '../actions/user';
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
} from '../constants';

export type TUserState = {
  readonly authRequest: boolean;
  readonly authFailed: boolean;
  readonly passRequest: boolean;
  readonly passFailed: boolean;
  readonly newPassRequest: boolean;
  readonly newPassFailed: boolean;
  readonly user: {
    readonly email: string;
    readonly name: string;
  };
};

const initialState: TUserState = {
  authRequest: false,
  authFailed: true,
  passRequest: false,
  passFailed: true,
  newPassRequest: false,
  newPassFailed: true,
  user: {
    email: '',
    name: '',
  },
};

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
  switch (action.type) {
    case AUTH_REQUEST: {
      return {
        ...state,
        authRequest: true,
        authFailed: false,
      };
    }
    case AUTH_FAILED: {
      return {
        ...state,
        authRequest: false,
        authFailed: true,
      };
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        authRequest: false,
        authFailed: false,
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
        passFailed: false,
      };
    }
    case PASS_FAILED: {
      return {
        ...state,
        passRequest: false,
        passFailed: true,
      };
    }
    case NEW_PASS_REQUEST: {
      return {
        ...state,
        newPassRequest: true,
      };
    }
    case NEW_PASS_SUCCESS: {
      return {
        ...state,
        newPassRequest: false,
        newPassFailed: false,
      };
    }
    case NEW_PASS_FAILED: {
      return {
        ...state,
        newPassRequest: false,
        newPassFailed: true,
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
