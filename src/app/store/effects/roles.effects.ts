import { Injectable } from '@angular/core';
// RxJS
import { map, withLatestFrom, filter, switchMap, tap } from 'rxjs/operators';
// NGRX
import { AllRolesLoaded, RequestLoadRoles, RolesActionTypes } from '../actions/roles.actions';
import { Effect, Actions, ofType, OnInitEffects } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { RolesService } from '../../core/services/roles.service';
import { AppState, selectRoleLoaded } from '..';
// Model
import { Roles } from '../../core';

@Injectable()
export class RolesEffects implements OnInitEffects {
  @Effect()
  loadRoles$ = this.actions$.pipe(
    ofType<RequestLoadRoles>(RolesActionTypes.RequestLoadRoles),
    withLatestFrom(this.store.select(selectRoleLoaded)),
    filter(([_, loaded]) => !loaded),
    switchMap(() => this.rolesService.getAllRoles().pipe(map((result: Roles[]) => new AllRolesLoaded({ roles: result })))),
  );

  constructor(private actions$: Actions, private store: Store<AppState>, private rolesService: RolesService) {}

  ngrxOnInitEffects(): Action {
    return { type: RolesActionTypes.RequestLoadRoles };
  }
}
