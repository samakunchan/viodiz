import { Action } from '@ngrx/store';

export const authFeatureKey = 'auth';

export interface State {
  id?: undefined;
}

export const initialState: State = {};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    default:
      return state;
  }
}
