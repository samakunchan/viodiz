import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateRole, RolesStateEntity } from '../reducers/roles.reducer';

const selectRolesState = createFeatureSelector<AppStateRole, RolesStateEntity>('roles');

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