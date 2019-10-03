import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { defer, Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class PermissionEffects {
  @Effect()
  init$: Observable<Action> = defer(() => {
    // A changer
    return this.actions$;
  });
  constructor(private actions$: Actions) {}
}
