import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../index';
import { ProductStateEntity } from '../reducers/products.reducer';

const selectProductState = createFeatureSelector<AppState, ProductStateEntity>('products');

export const selectProductLoading = createSelector(
  selectProductState,
  product => product.productLoading,
);
export const selectProductLoaded = createSelector(
  selectProductState,
  product => product.productLoaded,
);
export const getAllProducts = createSelector(
  selectProductState,
  product => product.data,
);
export const getCurrentProduct = createSelector(
  selectProductState,
  product => product.productSelected,
);
