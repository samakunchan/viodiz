import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectAllCourses } from '../../../store';
import { ProductsService } from '../../../core/services/products.service';
import { Observable } from 'rxjs';
import { Courses, Products } from '../../../core';
import { FormBuilder, FormGroup } from '@angular/forms';

// https://www.presse-citron.net/wordpress_prod/wp-content/uploads/2018/11/meilleure-banque-image.jpg
@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.scss'],
})
export class ProductsAddComponent implements OnInit {
  public courses$: Observable<Courses[]>;
  public productForm: FormGroup;
  public product: Products;

  constructor(private store: Store<AppState>, private productService: ProductsService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.courses$ = this.store.select(selectAllCourses);
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      title: [''],
      image: [''],
      coursesId: [''],
      price: [''],
      timeEstimate: [''],
      isCertificated: [''],
    });
  }

  onSubmit() {
    this.product = new Products();
    this.product.clear();
    this.product.coursesId = this.productForm.value['coursesId'];
    this.product.title = this.productForm.value['title'];
    this.product.price = this.productForm.value['price'];
    this.product.timeEstimate = this.productForm.value['timeEstimate'];
    this.product.isCertificated = this.productForm.value['isCertificated'];
    this.product.image = this.productForm.value['image'];
    this.productService
      .createProduct(this.product)
      .then(res => {
        console.log(res);
        if (res) {
          // this.store.dispatch(new ProductCreated());
        }
      })
      .catch(error => console.log(error));
  }
}
