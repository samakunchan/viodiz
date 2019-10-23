import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../index';
import { TransactionStateEntity } from '../reducers/transactions.reducer';

const selectTransactionState = createFeatureSelector<AppState, TransactionStateEntity>('transactions');

export const selectTrancationLoading = createSelector(
  selectTransactionState,
  transaction => transaction.loading,
);
export const selectTrancationLoaded = createSelector(
  selectTransactionState,
  transaction => transaction.loaded,
);
export const getTransactions = createSelector(
  selectTransactionState,
  transaction => transaction.data,
);
