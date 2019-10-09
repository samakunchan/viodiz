import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../index';
import { AuthStateEntity } from '../reducers/auth.reducer';

const selectAuthState = createFeatureSelector<AppState, AuthStateEntity>('authUser');

export const isLoggedIn = createSelector(
  selectAuthState,
  auth => auth.loggedIn,
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn,
);

export const currentAuthToken = createSelector(
  selectAuthState,
  auth => auth.authToken,
);

export const isUserLoaded = createSelector(
  selectAuthState,
  auth => {
    return auth.isUserLoaded;
  },
);

export const currentUser = createSelector(
  selectAuthState,
  auth => auth.user,
);

// A faire le currentRole avant le push sur github
