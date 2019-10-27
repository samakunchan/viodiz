import { Action } from '@ngrx/store';
import { Products } from '../../core';

export enum ProductsActionTypes {
  RequestLoadProducts = '[Request All Products] Request products',
  AllProductsLoaded = '[All products Loaded] Product API',
  RequestOneProduct = '[Request one product] Product API',
  ProductSelected = '[Select the current product] Product API',
  ProductsPurchased = '[Select the product purchased] Product API',
  ProductCreated = '[ Add a product] Product API',
  ProductUpdated = '[Update the current product] Product API',
  ErrorLoadProduct = '[Error load products] Product API',
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
export class ProductsPurchased implements Action {
  readonly type = ProductsActionTypes.ProductsPurchased;
  constructor(public payload: { products: Products[] }) {}
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
  | ProductsPurchased
  | ProductCreated
  | ProductUpdated
  | ErrorLoadProduct;
