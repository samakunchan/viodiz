import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleProductComponent } from '../single-product/single-product.component';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog.component';
import { CatalogListComponent } from '../catalog-list/catalog-list.component';
import { CardProductComponent } from '../../partials/card-product/card-product.component';
import { NgxPayPalModule } from 'ngx-paypal';

const routes: Routes = [
  {
    path: '',
    component: CatalogComponent,
    children: [
      { path: 'list', component: CatalogListComponent, data: { animation: 'list' } },
      { path: 'product/:id', component: SingleProductComponent, data: { animation: 'see' } },
    ],
  },
];
@NgModule({
  declarations: [CatalogComponent, SingleProductComponent, CatalogListComponent, CardProductComponent],
  imports: [CommonModule, RouterModule.forChild(routes), NgxPayPalModule],
})
export class CatalogModule {}
