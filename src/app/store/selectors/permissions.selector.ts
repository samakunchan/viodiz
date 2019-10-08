import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../index';
import { PermStateEntity } from '../reducers/permissions.reducer';

const selectPermissionsState = createFeatureSelector<AppState, PermStateEntity>('permissions');

export const selectPermissionsLoading = createSelector(
  selectPermissionsState,
  permissions => permissions.permissionsLoading,
);
export const selectPermissionsLoaded = createSelector(
  selectPermissionsState,
  permissions => permissions.permissionsLoaded,
);
export const getAllPermissions = createSelector(
  selectPermissionsState,
  permissions => permissions.data,
);
