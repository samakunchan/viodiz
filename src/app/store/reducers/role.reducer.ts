import { Action } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';
import { Role } from '../../core';
import { RoleActionTypes } from '../actions/role.actions';

export const roleFeatureKey = 'role';

export interface State {
  text?: string;
}
export interface RolesState extends EntityState<Role> {
  LoadRoles: Role[];
}
export const initialState: State = {
  text: undefined,
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case RoleActionTypes.LoadRoles:

    default:
      return state;
  }
}
