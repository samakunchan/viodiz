import { Action } from '@ngrx/store';

export enum PermissionActionTypes {
  LoadPermissions = '[Permission] Load Permissions',
}

export class LoadPermissions implements Action {
  readonly type = PermissionActionTypes.LoadPermissions;
}

export type PermissionActions = LoadPermissions;
