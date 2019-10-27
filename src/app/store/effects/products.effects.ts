import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AllProductsLoaded, ProductsActionTypes, ProductSelected, RequestLoadProducts, RequestOneProduct } from '../actions/products.actions';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AppState, getAllProducts, selectProductLoaded } from '..';
import { Products } from '../../core';
import { ProductsService } from '../../core/services/products.service';

@Injectable()
export class ProductsEffects implements OnInitEffects {
  @Effect()
  loadProduct$ = this.actions$.pipe(
    ofType<RequestLoadProducts>(ProductsActionTypes.RequestLoadProducts),
    withLatestFrom(this.store.select(selectProductLoaded)),
    filter(([_, loaded]) => !loaded),
    switchMap(() => this.productsService.listProducts().pipe(map((result: Products[]) => new AllProductsLoaded({ products: result })))),
  );

  @Effect({ dispatch: false })
  requestOneProduct$ = this.actions$.pipe(
    ofType<RequestOneProduct>(ProductsActionTypes.RequestOneProduct),
    tap(action => {
      this.store.select(getAllProducts).subscribe(products => {
        let product;
        products.map(data => {
          if (data.id === action.payload.id) {
            return (product = data);
          }
        });
        this.store.dispatch(new ProductSelected({ product: product }));
      });
    }),
  );

  // Faire product purchased qui s'oocupe de plusieurs product
  constructor(private actions$: Actions, private productsService: ProductsService, private store: Store<AppState>) {}

  ngrxOnInitEffects(): Action {
    return { type: ProductsActionTypes.RequestLoadProducts };
  }
}
