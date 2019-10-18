import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsAddComponent } from '../products-add/products-add.component';
import { ProductsEditComponent } from '../products-edit/products-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  { path: 'list', component: ProductsComponent },
  { path: 'add', component: ProductsAddComponent },
  { path: 'edit', component: ProductsEditComponent },
];
@NgModule({
  declarations: [ProductsComponent, ProductsAddComponent, ProductsEditComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ProductsModule {}
