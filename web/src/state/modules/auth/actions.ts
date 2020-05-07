import { AuthState, SET_AUTH_STATE, AuthActionTypes } from "./types";

export function setAuthState(state: AuthState): AuthActionTypes {
  return {
    type: SET_AUTH_STATE,
    payload: state,
  };
}
