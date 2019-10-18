import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, RolesStateEntity } from '../index';

const selectRolesState = createFeatureSelector<AppState, RolesStateEntity>('roles');

export const selectRoleLoading = createSelector(
  selectRolesState,
  roles => roles.rolesLoading,
);
export const selectRoleLoaded = createSelector(
  selectRolesState,
  roles => roles.rolesLoaded,
);
export const getAllRoles = createSelector(
  selectRolesState,
  roles => roles.data,
);
export const getCurrentRole = createSelector(
  selectRolesState,
  roles => roles.roleSelected,
);
