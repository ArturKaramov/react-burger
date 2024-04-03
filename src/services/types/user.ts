export type TAuthResponse = {
  readonly success: boolean;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly user: { readonly email: string; readonly name: string };
};

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
