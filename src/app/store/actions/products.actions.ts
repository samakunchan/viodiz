import { Action } from '@ngrx/store';
import { Products } from '../../core';

export enum ProductsActionTypes {
  RequestLoadProducts = '[Products] Request Load Products',
  AllProductsLoaded = '[Products API] All products Loaded',
  RequestOneProduct = '[Products API] Request one product',
  ProductSelected = '[Products API] Select the current product',
  ProductCreated = '[Products] Add a product',
  ProductUpdated = '[Products] Update the current product',
  ErrorLoadProduct = '[Products API] Error load products',
}

export class RequestLoadProducts implements Action {
  readonly type = ProductsActionTypes.RequestLoadProducts;
}
export class AllProductsLoaded implements Action {
  readonly type = ProductsActionTypes.AllProductsLoaded;
  constructor(public payload: { products: Products[] }) {}
}
export class RequestOneProduct implements Action {
  readonly type = ProductsActionTypes.RequestOneProduct;
  constructor(public payload: { id: string }) {}
}
export class ProductSelected implements Action {
  readonly type = ProductsActionTypes.ProductSelected;
  constructor(public payload: { product: Products }) {}
}
export class ProductCreated implements Action {
  readonly type = ProductsActionTypes.ProductCreated;
  constructor(public payload: { products: Products }) {}
}
export class ProductUpdated implements Action {
  readonly type = ProductsActionTypes.ProductUpdated;
  constructor(public payload: { products: Products }) {}
}
export class ErrorLoadProduct implements Action {
  readonly type = ProductsActionTypes.ErrorLoadProduct;
  constructor(public payload: { products: Products[] }) {}
}
export type ProductsActions =
  | RequestLoadProducts
  | AllProductsLoaded
  | RequestOneProduct
  | ProductSelected
  | ProductCreated
  | ProductUpdated
  | ErrorLoadProduct;
