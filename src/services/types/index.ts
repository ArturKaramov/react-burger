import { store } from '../store';
import {
  IngrType,
  statuses,
  IIngredient,
  IOrder,
  TOrderResponse,
  TWSActions,
  TWSResponse,
} from './burger';

import { IUser, TAuthResponse, TLoginResponse } from './user';

export { IngrType, statuses };
export type { IIngredient, IOrder, TOrderResponse, TWSActions, TWSResponse };
export type { IUser, TAuthResponse, TLoginResponse };
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
