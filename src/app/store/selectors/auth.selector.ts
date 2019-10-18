import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, AuthStateEntity } from '../index';

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
