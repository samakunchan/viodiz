import { Roles } from '../../core';
import { RolesActions, RolesActionTypes } from '../actions/roles.actions';

export const roleFeatureKey = 'roles';

export interface RolesStateEntity {
  rolesLoaded: boolean;
  rolesLoading: boolean;
  data: Roles[] | null;
  roleSelected: string;
}

export const initialRolesState: RolesStateEntity = {
  rolesLoaded: false,
  rolesLoading: false,
  data: null,
  roleSelected: undefined,
};

export function rolesReducer(state = initialRolesState, action: RolesActions): RolesStateEntity {
  switch (action.type) {
    case RolesActionTypes.AllRolesLoaded:
      return {
        ...state,
        data: action.payload.roles,
        rolesLoading: false,
        rolesLoaded: true,
      };
    case RolesActionTypes.RoleSelected:
      return {
        ...state,
        roleSelected: action.payload.currentRole,
        rolesLoading: false,
        rolesLoaded: true,
      };
    case RolesActionTypes.ErrorLoadRole:
      return {
        ...state,
        rolesLoading: false,
      };
    default:
      return state;
  }
}
