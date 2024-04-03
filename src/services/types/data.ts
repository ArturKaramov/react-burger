import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

export type TInputValue = {
  [key: string]: string;
};

export const bun = 'bun';
export const main = 'main';
export const sauce = 'sauce';

export enum IngrType {
  BUN = 'bun',
  MAIN = 'main',
  SAUCE = 'sauce',
}

export const statuses: Record<string, string> = {
  done: 'Выполнен',
  pending: 'Готовится',
  created: 'Создан',
};

export interface IIngredient {
  readonly _id: string;
  readonly name: string;
  readonly type: IngrType;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: string;
  key?: string;
  [k: string]: string | number | undefined;
}

export type TAuthResponse = {
  readonly success: boolean;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly user: { readonly email: string; readonly name: string };
};

export interface IOrder {
  readonly ingredients: ReadonlyArray<string>;
  readonly name: string;
  readonly _id: string;
  readonly status: string;
  readonly number: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface IUser {
  readonly name: string;
  readonly email: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export type TLoginResponse = {
  readonly success: boolean;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly user: { readonly name: string; readonly email: string };
};

export type TWSResponse = {
  readonly success: boolean;
  readonly orders: ReadonlyArray<IOrder>;
  readonly total: number;
  readonly totalToday: number;
};

export type TWSActions = {
  wsInit: ActionCreatorWithoutPayload | ActionCreatorWithPayload<string>;
  wsClose: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithoutPayload;
  onMessage: ActionCreatorWithPayload<any>;
};

export type TOrderResponse = {
  success: boolean;
  name: string;
  order: IOrder & { owner: IUser; price: number };
};
