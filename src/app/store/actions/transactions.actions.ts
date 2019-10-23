import { Action } from '@ngrx/store';
import { PaypalInfos } from '../../core/models/paypalInfos.model';

export enum TransactionsActionTypes {
  LoadTransactions = '[Transactions] Load Transactionss',
  RequestTransaction = '[Request transaction Paypal] action',
  TransactionCompleted = '[Transaction Paypal complete] action',
}

export class LoadTransactions implements Action {
  readonly type = TransactionsActionTypes.LoadTransactions;
}
export class RequestTransaction implements Action {
  readonly type = TransactionsActionTypes.RequestTransaction;
  constructor(public payload: { paypal: PaypalInfos }) {}
}
export class TransactionCompleted implements Action {
  readonly type = TransactionsActionTypes.TransactionCompleted;
  constructor(public payload: { paypal: PaypalInfos }) {}
}

export type TransactionsActions = LoadTransactions | RequestTransaction | TransactionCompleted;
