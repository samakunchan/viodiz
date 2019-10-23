import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RequestTransaction, TransactionCompleted, TransactionsActionTypes } from '../actions/transactions.actions';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../index';

@Injectable()
export class TransactionsEffects {
  @Effect({ dispatch: false })
  requestTransaction = this.actions$.pipe(
    ofType<RequestTransaction>(TransactionsActionTypes.RequestTransaction),
    tap(action => this.store.dispatch(new TransactionCompleted({ paypal: action.payload.paypal }))),
  );
  constructor(private actions$: Actions, private store: Store<AppState>) {}
}
