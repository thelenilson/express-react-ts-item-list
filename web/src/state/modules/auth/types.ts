export const SET_AUTH_STATE = "auth/SET_AUTH_STATE";

export interface UserData {
  id?: number;
  email?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface AuthState {
  loggedIn: boolean;
  userData: UserData;
}

export interface SetAuthInfoAction {
  type: typeof SET_AUTH_STATE;
  payload: AuthState;
}

export type AuthActionTypes = SetAuthInfoAction;
