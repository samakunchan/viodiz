import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { Observable } from 'rxjs';
import { Products } from '../../core';
import { getProductPurchased } from '../../store/selectors/products.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public products: Observable<Products[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.products = this.store.select(getProductPurchased);
  }
}
