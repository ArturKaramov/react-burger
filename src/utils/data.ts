export enum INGRS {
  BUN = 'bun',
  MAIN = 'main',
  SAUCE = 'sauce',
}
export const url: string = 'https://norma.nomoreparties.space/api';
export const maxIngr: number = 6; //максимальное количество показанных в ленте заказов ингридиентов по каждому заказу

export const statuses: Record<string, string> = {
  done: 'Выполнен',
  pending: 'Готовится',
  created: 'Создан',
};

export const BASE_URL: string = '';
export const LOGIN_URL: string = BASE_URL + '/login';
export const REGISTER_URL: string = BASE_URL + '/register';
export const PROFILE_URL: string = BASE_URL + '/profile';
export const USER_ORDERS_URL: string = PROFILE_URL + '/orders';
export const EXIT_URL: string = PROFILE_URL + '/exit';
export const INGREDIENTS_URL: string = BASE_URL + '/ingredients';
export const FORGOT_URL: string = BASE_URL + '/forgot-password';
export const RESET_URL: string = BASE_URL + '/reset-password';
export const FEED_URL: string = BASE_URL + '/feed';
