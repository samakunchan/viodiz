import { Permissions } from '../../core';
import { PermissionsActions, PermissionsActionTypes } from '..';

export const permissionFeatureKey = 'permission';

export interface PermStateEntity {
  permissionsLoading: boolean;
  permissionsLoaded: boolean;
  data: Permissions[] | null;
}

export const initialPermissionsState: PermStateEntity = {
  permissionsLoading: false,
  permissionsLoaded: false,
  data: null,
};

export function permissionsReducer(state = initialPermissionsState, action: PermissionsActions): PermStateEntity {
  switch (action.type) {
    case PermissionsActionTypes.AllPermissionsLoaded:
      return {
        ...state,
        data: action.payload.permissions,
        permissionsLoading: false,
        permissionsLoaded: true,
      };
    case PermissionsActionTypes.ErrorLoadPermissions:
      return {
        ...state,
        permissionsLoaded: false,
      };
    default:
      return state;
  }
}
