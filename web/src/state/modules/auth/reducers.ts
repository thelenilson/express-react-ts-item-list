import { AuthState, SET_AUTH_STATE, AuthActionTypes } from "./types";

const initialState: AuthState = {
  loggedIn: false,
  userData: {
    id: undefined,
    email: undefined,
    accessToken: undefined,
    refreshToken: undefined,
  },
};

export function authReducer(
  state = initialState,
  action: AuthActionTypes
): AuthState {
  switch (action.type) {
    case SET_AUTH_STATE:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}
