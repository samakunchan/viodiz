import { Action } from '@ngrx/store';
import { Roles } from '../../core';
import { HttpErrorResponse } from '@angular/common/http';

export enum RolesActionTypes {
  RequestLoadRoles = '[Role] Request Load data Roles',
  AllRolesLoaded = '[Roles API] All Roles Loaded',
  ErrorLoadRole = '[Roles API] Error load roles',
  RoleSelected = '[Roles API] Select the current role',
}

export class RequestLoadRoles implements Action {
  readonly type = RolesActionTypes.RequestLoadRoles;
}
export class AllRolesLoaded implements Action {
  readonly type = RolesActionTypes.AllRolesLoaded;
  constructor(public payload: { roles: Roles[] }) {}
}
export class RoleSelected implements Action {
  readonly type = RolesActionTypes.RoleSelected;
  constructor(public payload: { currentRole: string }) {}
}
export class ErrorLoadRoles {
  readonly type = RolesActionTypes.ErrorLoadRole;
  constructor(public payload: HttpErrorResponse) {}
}

export type RolesActions = RequestLoadRoles | AllRolesLoaded | RoleSelected | ErrorLoadRoles;
