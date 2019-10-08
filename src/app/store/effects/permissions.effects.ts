import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AllPermissionsLoaded, PermissionsActionTypes, RequestLoadPermissions } from '../actions/permissions.actions';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AppState, selectPermissionsLoaded } from '..';
import { Permissions } from '../../core';
import { PermissionsService } from '../../core/services/permissions.service';

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
  constructor(private actions$: Actions, private permissionsService: PermissionsService, private store: Store<AppState>) {}

  ngrxOnInitEffects(): Action {
    return { type: PermissionsActionTypes.RequestLoadPermissions };
  }
}
