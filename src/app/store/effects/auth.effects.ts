import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AuthActionTypes, AuthUserRequested, Login, Logout } from '../actions/auth.actions';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AppState, currentUser } from '../index';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects implements OnInitEffects {
  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    tap(action => {
      localStorage.setItem(environment.authTokenKey, action.payload.authToken);
      this.store.dispatch(new AuthUserRequested());
    }),
  );
  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.Logout),
    tap(() => {
      localStorage.removeItem(environment.authTokenKey);
      this.authService.signOut();
      this.router.navigate(['auth', 'login']);
    }),
  );

  authUserRequest$ = this.actions$.pipe(
    ofType<AuthUserRequested>(AuthActionTypes.AuthUserRequested),
    withLatestFrom(this.store.select(currentUser)),
    filter(([_, loaded]) => !loaded),
    switchMap(() =>
      this.authService.getUserByTokenFromCloud().pipe(
        map(authUser => {
          if (authUser) {
            console.log(authUser);
          } else {
            this.store.dispatch(new Logout());
          }
        }),
      ),
    ),
  );
  constructor(private actions$: Actions, private store: Store<AppState>, private authService: AuthService, private router: Router) {}

  ngrxOnInitEffects(): Action {
    const userToken = localStorage.getItem(environment.authTokenKey);
    if (userToken) {
      return new Login({ authToken: userToken });
    }
    return { type: 'NO_ACTION' };
  }
}
