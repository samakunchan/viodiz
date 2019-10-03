import { Action } from '@ngrx/store';

export enum RoleActionTypes {
  LoadRoles = '[Role] Load Roles',
}

export class LoadRoles implements Action {
  readonly type = RoleActionTypes.LoadRoles;
}

export type RoleActions = LoadRoles;
