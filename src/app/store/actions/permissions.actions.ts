import { Action } from '@ngrx/store';
import { Permissions } from '../../core';
import { HttpErrorResponse } from '@angular/common/http';

export enum PermissionsActionTypes {
  RequestLoadPermissions = '[Role] Request Load data Permissions',
  AllPermissionsLoaded = '[Permissions API] All Permissions Loaded',
  ErrorLoadPermissions = '[Permissions API] Error load Permissions',
}

export class RequestLoadPermissions implements Action {
  readonly type = PermissionsActionTypes.RequestLoadPermissions;
}

export class AllPermissionsLoaded implements Action {
  readonly type = PermissionsActionTypes.AllPermissionsLoaded;
  constructor(public payload: { permissions: Permissions[] }) {}
}
export class ErrorLoadPermissions {
  readonly type = PermissionsActionTypes.ErrorLoadPermissions;
  constructor(public payload: HttpErrorResponse) {}
}

export type PermissionsActions = RequestLoadPermissions | AllPermissionsLoaded | ErrorLoadPermissions;
