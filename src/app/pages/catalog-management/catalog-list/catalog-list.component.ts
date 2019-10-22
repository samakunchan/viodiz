import { Component, OnInit } from '@angular/core';
import { AppState, getAllProducts } from '../../../store';
import { Observable } from 'rxjs';
import { Products } from '../../../core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.scss'],
})
export class CatalogListComponent implements OnInit {
  public products$: Observable<Products[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.products$ = this.store.select(getAllProducts);
  }
}
