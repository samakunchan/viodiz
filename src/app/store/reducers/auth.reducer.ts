import { AuthUser } from '../../core/models/auth.model';
import { AuthActions, AuthActionTypes } from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface AuthStateEntity {
  loggedIn: boolean;
  authToken: string;
  user: AuthUser | null;
  isUserLoaded: boolean;
}

export const initialAuthState: AuthStateEntity = {
  loggedIn: false,
  authToken: undefined,
  user: undefined,
  isUserLoaded: false,
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthStateEntity {
  switch (action.type) {
    case AuthActionTypes.Login: {
      const _token: string = action.payload.authToken;
      return {
        loggedIn: true,
        authToken: _token,
        user: undefined,
        isUserLoaded: false,
      };
    }

    case AuthActionTypes.Register: {
      const _token: string = action.payload.authToken;
      return {
        loggedIn: true,
        authToken: _token,
        user: undefined,
        isUserLoaded: false,
      };
    }

    case AuthActionTypes.Logout:
      return initialAuthState;

    case AuthActionTypes.AuthUserLoaded: {
      const _user: AuthUser = action.payload.user;
      return {
        ...state,
        user: _user,
        isUserLoaded: true,
      };
    }
    default:
      return state;
  }
}
