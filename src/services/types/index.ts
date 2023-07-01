import { store } from "../store";
import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator, Dispatch } from "redux";
import { TBurgerActions } from "../actions/burger";
import { TUserActions } from "../actions/user";
import { TFeedActions } from "../actions/feed";
import { TUserFeedActions } from "../actions/userFeed";
import { rootReducer } from "../reducers";

export type TAppActions =
  | TUserActions
  | TBurgerActions
  | TFeedActions
  | TUserFeedActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = Dispatch<TAppActions>;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TAppActions>
>;
