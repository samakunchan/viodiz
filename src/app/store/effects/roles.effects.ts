import { Injectable } from '@angular/core';
// RxJS
import { map, withLatestFrom, filter, switchMap, tap } from 'rxjs/operators';
// NGRX
import { AllRolesLoaded, RequestLoadRoles, RolesActionTypes, RoleSelected } from '../actions/roles.actions';
import { Effect, Actions, ofType, OnInitEffects } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { RolesService } from '../../core/services/roles.service';
import { AppState, getAllRoles, selectRoleLoaded } from '..';
// Model
import { Roles } from '../../core';
import { NgxRolesService } from 'ngx-permissions';

@Injectable()
export class RolesEffects implements OnInitEffects {
  @Effect()
  loadRoles$ = this.actions$.pipe(
    ofType<RequestLoadRoles>(RolesActionTypes.RequestLoadRoles),
    withLatestFrom(this.store.select(selectRoleLoaded)),
    filter(([_, loaded]) => !loaded),
    switchMap(() => this.rolesService.getAllRoles().pipe(map((result: Roles[]) => new AllRolesLoaded({ roles: result })))),
  );
  @Effect({ dispatch: false })
  RoleSelected$ = this.actions$.pipe(
    ofType<RoleSelected>(RolesActionTypes.RoleSelected),
    tap(action => {
      this.store.select(getAllRoles).subscribe((roles: Roles[]) => {
        roles.map(result => {
          if (result.name === action.payload.currentRole) {
            return this.ngxRolesService.addRole(result.name, result.permissions);
          }
        });
      });
    })
  );
  constructor(private actions$: Actions, private store: Store<AppState>, private rolesService: RolesService, private ngxRolesService: NgxRolesService) {}

  ngrxOnInitEffects(): Action {
    return { type: RolesActionTypes.RequestLoadRoles };
  }
}
