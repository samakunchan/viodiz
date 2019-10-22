import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsAddComponent } from '../products-add/products-add.component';
import { ProductsEditComponent } from '../products-edit/products-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductsListComponent } from '../products-list/products-list.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      { path: 'list', component: ProductsListComponent, data: { animation: 'list' } },
      { path: 'add', component: ProductsAddComponent, data: { animation: 'add' } },
      { path: 'edit', component: ProductsEditComponent, data: { animation: 'edit' } },
    ],
  },
];
@NgModule({
  declarations: [ProductsComponent, ProductsAddComponent, ProductsEditComponent, ProductsListComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class ProductsModule {}
