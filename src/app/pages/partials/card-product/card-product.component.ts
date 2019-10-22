import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
})
export class CardProductComponent implements OnInit {
  @Input() indexInput: string;
  @Input() title: string;
  @Input() coursesId: string;
  @Input() timeEstimate: string;
  @Input() isCertificated: boolean;
  @Input() price: number;
  @Input() image: string;
  @Input() id?: string;
  constructor() {}

  ngOnInit() {}

  getUrlImage() {
    return `url(${this.image}`;
  }
}
