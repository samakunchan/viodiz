import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  AppState,
  AuthActionTypes,
  AuthUserLoaded,
  AuthUserRequested,
  AuthUserUpdateAddInfos,
  CurrentUserUpdatePhoto,
  Login,
  Logout,
  Register,
  RoleSelected,
  currentUser,
  getAllProducts,
} from '../index';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import * as toastr from '../../../assets/js/toastr';
import { TranslateService } from '@ngx-translate/core';
import { AuthUser } from '../../core';
import { ProductsPurchased } from '../actions/products.actions';

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
      this.authService.signOut().then(() => {
        window.location.reload();
      });
      this.router.navigate(['auth', 'login']);
    }),
  );
  @Effect({ dispatch: false })
  register$ = this.actions$.pipe(
    ofType<Register>(AuthActionTypes.Register),
    tap(action => {
      localStorage.setItem(environment.authTokenKey, action.payload.authToken);
    }),
  );
  @Effect({ dispatch: false })
  authUserRequest$ = this.actions$.pipe(
    ofType<AuthUserRequested>(AuthActionTypes.AuthUserRequested),
    withLatestFrom(this.store.select(currentUser)),
    filter(([_, loaded]) => !loaded),
    switchMap(() =>
      this.authService.getUserByTokenFromCloud().pipe(
        map(authUser => {
          if (authUser.result || authUser.authState) {
            console.log(authUser);
            this.authService.getAuthUser().subscribe((user: AuthUser) => {
              this.store.dispatch(new RoleSelected({ currentRole: user.role }));
              // Faire aussi if (user.animator) et if (user.animator && user.student)
              if (user.isStudent) {
                this.authService.getStudent(user).subscribe((data: any) => {
                  const products = [];
                  data.map(result => {
                    this.store.select(getAllProducts).subscribe(all => {
                      all.map(prod => {
                        if (prod.id === result.productId) {
                          products.push(prod);
                        }
                      });
                    });
                  });
                  this.store.dispatch(new ProductsPurchased({ products: products }));
                  this.store.dispatch(new AuthUserLoaded({ user }));
                });
              } else {
                this.store.dispatch(new AuthUserLoaded({ user }));
              }
            });
          } else {
            this.store.dispatch(new Logout());
          }
        }),
      ),
    ),
  );
  @Effect({ dispatch: false })
  updateAuthUser$ = this.actions$.pipe(
    ofType<AuthUserUpdateAddInfos>(AuthActionTypes.AuthUserUpdateAddInfos),
    switchMap(action =>
      this.authService.updateAuthUserProfil(action.payload.user).pipe(
        map(authUser => {
          if (authUser) {
            toastr.success(this.translate.instant('AUTH.NOTIFICATIONS.PROFIL.SUCCESS'), 'Profil');
            this.store.dispatch(new AuthUserLoaded({ user: authUser }));
          } else {
            toastr.success(this.translate.instant('AUTH.NOTIFICATIONS.PROFIL.FAILURE'), 'Profil');
          }
        }),
      ),
    ),
  );
  @Effect({ dispatch: false })
  changePhoto$ = this.actions$.pipe(
    ofType<CurrentUserUpdatePhoto>(AuthActionTypes.CurrentUserUpdatePhoto),
    switchMap(({ payload }) => this.authService.updateAuthUserProfilPhoto(payload.user).pipe(map(photo => console.log(photo)))),
  );
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService,
  ) {}

  ngrxOnInitEffects(): Action {
    const userToken = localStorage.getItem(environment.authTokenKey);
    if (userToken) {
      return new Login({ authToken: userToken });
    }
    return { type: 'NO_ACTION' };
  }
}
