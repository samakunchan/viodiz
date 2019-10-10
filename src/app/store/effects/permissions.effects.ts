import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AllPermissionsLoaded, PermissionsActionTypes, RequestLoadPermissions } from '../actions/permissions.actions';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AppState, getAllPermissions, selectPermissionsLoaded } from '..';
import { Permissions } from '../../core';
import { PermissionsService } from '../../core/services/permissions.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable()
export class PermissionsEffects implements OnInitEffects {
  @Effect()
  loadRoles$ = this.actions$.pipe(
    ofType<RequestLoadPermissions>(PermissionsActionTypes.RequestLoadPermissions),
    withLatestFrom(this.store.select(selectPermissionsLoaded)),
    filter(([_, loaded]) => !loaded),
    switchMap(() =>
      this.permissionsService.getAllPermissions().pipe(map((result: Permissions[]) => new AllPermissionsLoaded({ permissions: result }))),
    ),
  );
  @Effect({ dispatch: false })
  giveRoleToNgx$ = this.actions$.pipe(
    ofType<AllPermissionsLoaded>(PermissionsActionTypes.AllPermissionsLoaded),
    tap(() => {
      this.store.select(getAllPermissions).subscribe(permissions => {
        const permTitle = permissions.map(res => {
          return res.title;
        });
        this.ngxPermissionsService.addPermission(permTitle);
      });
    })
  );
  constructor(private actions$: Actions, private permissionsService: PermissionsService, private store: Store<AppState>, private ngxPermissionsService: NgxPermissionsService) {}

  ngrxOnInitEffects(): Action {
    return { type: PermissionsActionTypes.RequestLoadPermissions };
  }
}
