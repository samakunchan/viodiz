import { ProductsActions, ProductsActionTypes } from '../actions/products.actions';
import { Products } from '../../core';

export const productsFeatureKey = 'products';

export interface ProductStateEntity {
  productLoading: boolean;
  productLoaded: boolean;
  data: Products[] | null;
  productPurchased: Products[] | null;
  productSelected: Products | null;
}

export const initialState: ProductStateEntity = {
  productLoading: false,
  productLoaded: false,
  data: undefined,
  productSelected: undefined,
  productPurchased: undefined,
};

export function productReducer(state = initialState, action: ProductsActions): ProductStateEntity {
  switch (action.type) {
    case ProductsActionTypes.AllProductsLoaded:
      return {
        ...state,
        data: action.payload.products,
        productLoading: false,
        productLoaded: true,
        productSelected: undefined,
      };
    case ProductsActionTypes.ProductSelected:
      return {
        ...state,
        productSelected: action.payload.product,
        productLoading: false,
        productLoaded: true,
      };
      case ProductsActionTypes.ProductsPurchased:
      return {
        ...state,
        productPurchased: action.payload.products,
        productLoading: false,
        productLoaded: true,
      };
    default:
      return state;
  }
}
