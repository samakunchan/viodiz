import { Action } from '@ngrx/store';
import { AuthUser } from '../../core';

export enum AuthActionTypes {
  Login = '[Login] Action',
  Logout = '[Logout] Action',
  Register = '[Register] Action',
  AuthUserRequested = '[Request User] Action',
  AuthUserLoaded = '[Loaded User] Auth API Firebase',
  CurrentUserUpdatePhoto = '[Update current user photo] Auth API Firebase',
  AuthUserUpdateAddInfos = '[Update current user additionnal information] Auth API Firebase',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
  constructor(public payload: { authToken: string }) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class Register implements Action {
  readonly type = AuthActionTypes.Register;
  constructor(public payload: { authToken: string }) {}
}

export class AuthUserRequested implements Action {
  readonly type = AuthActionTypes.AuthUserRequested;
}

export class AuthUserLoaded implements Action {
  readonly type = AuthActionTypes.AuthUserLoaded;
  constructor(public payload: { user: AuthUser }) {}
}

export class CurrentUserUpdatePhoto implements Action {
  readonly type = AuthActionTypes.CurrentUserUpdatePhoto;
  constructor(public payload: { user: AuthUser }) {}
}

export class AuthUserUpdateAddInfos {
  readonly type = AuthActionTypes.AuthUserUpdateAddInfos;
  constructor(public payload: { user: AuthUser }) {}
}

export type AuthActions = Login | Logout | Register | AuthUserRequested | AuthUserLoaded | CurrentUserUpdatePhoto | AuthUserUpdateAddInfos;
