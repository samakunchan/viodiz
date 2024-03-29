import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, getAllProducts, getCurrentProduct } from '../../../store';
import { RequestOneProduct } from '../../../store/actions/products.actions';
import { Observable } from 'rxjs';
import { Products } from '../../../core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { paypalSandbox } from '../../../../environments/api-config';
import { PaypalInfos } from '../../../core/models/paypalInfos.model';
import { RequestTransaction } from '../../../store/actions/transactions.actions';
import { RequestOneCourse } from '../../../store/actions/courses.actions';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
})
export class SingleProductComponent implements OnInit {
  @ViewChild('paypal', { static: false }) paypalElement: ElementRef;
  public id;
  public product$: Observable<Products>;
  public product: Products;
  public payPalConfig?: IPayPalConfig;
  public paypal: PaypalInfos;
  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.store.select(getAllProducts).subscribe(allProducts => {
      if (allProducts) {
        this.store.dispatch(new RequestOneProduct({ id: this.id }));
        this.product$ = this.store.select(getCurrentProduct);
        this.product$.subscribe((product: Products) => {
          this.product = product;
        });
        this.initConfig();
      }
    });
  }

  private initConfig(): void {
    this.product$.subscribe(product => {
      this.payPalConfig = {
        currency: 'EUR',
        clientId: paypalSandbox.clientId, // Attention: Paypal change cette clé parfois en sandbox
        createOrderOnClient: () => <ICreateOrderRequest>(<unknown>{
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  currency_code: 'EUR',
                  value: product.price,
                  breakdown: {
                    item_total: {
                      currency_code: 'EUR',
                      value: product.price,
                    },
                  },
                },
                items: [
                  {
                    name: product.title,
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                      currency_code: 'EUR',
                      value: product.price,
                    },
                  },
                ],
              },
            ],
          }),
        advanced: {
          commit: 'true',
        },
        style: {
          label: 'paypal',
          layout: 'vertical',
        },
        onApprove: (data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
          actions.order.get().then(details => {
            console.log('onApprove - you can get full order details inside onApprove: ', details);
          });
        },
        onClientAuthorization: data => {
          console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);

          this.paypal = new PaypalInfos();
          this.paypal.clear();
          this.paypal.create_time = data.create_time;
          this.paypal.id = data.id;
          this.paypal.status = data.status;
          this.paypal.payer.payer_id = data.payer.payer_id;
          this.paypal.payer.email_address = data.payer.email_address;
          this.paypal.payer.name.given_name = data.payer.name.given_name;
          this.paypal.payer.name.surname = data.payer.name.surname;
          this.paypal.product.id = this.product.id;
          this.store.dispatch(new RequestTransaction({ paypal: this.paypal }));
          this.store.dispatch(new RequestOneCourse({ id: this.product.coursesId }));
        },
        onCancel: (data, actions) => {
          console.log('OnCancel', data, actions);
        },
        onError: err => {
          console.log('OnError', err);
        },
        onClick: (data, actions) => {
          console.log('onClick', data, actions);
        },
      };
    });
  }
}
