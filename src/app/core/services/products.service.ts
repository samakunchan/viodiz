import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Products } from '..';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private db: AngularFirestore) {}

  createProduct(product: Products) {
    return this.db.collection<Products>('Products').add({
      title: product.title,
      coursesId: product.coursesId,
      timeEstimate: product.timeEstimate,
      price: product.price,
      image: product.image,
      isCertificated: product.isCertificated,
    });
  }

  listProducts() {
    return new Observable(observer => {
      this.db
        .collection('Products')
        .get()
        .subscribe(res => {
          const datas = [];
          res.forEach(doc => {
            const id = { id: doc.id };
            datas.push({ ...doc.data(), ...id });
          });
          if (res) {
            observer.next(datas);
          } else {
            observer.error('Aucune données disponible');
          }
        });
    });
  }
}
