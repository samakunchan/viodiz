import { TransactionsActions, TransactionsActionTypes } from '../actions/transactions.actions';
import { PaypalInfos } from '../../core/models/paypalInfos.model';

export const transactionsFeatureKey = 'transactions';

export interface TransactionStateEntity {
  loading: boolean;
  loaded: boolean;
  data: PaypalInfos | null;
}

export const initialState: TransactionStateEntity = {
  loading: false,
  loaded: false,
  data: undefined,
};

export function transactionReducer(state = initialState, action: TransactionsActions): TransactionStateEntity {
  switch (action.type) {
    case TransactionsActionTypes.TransactionCompleted:
      return {
        ...state,
        loaded: true,
        data: action.payload.paypal,
      };
    default:
      return state;
  }
}
