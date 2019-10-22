import { Component, OnInit } from '@angular/core';
import { slider } from '../../../core/animations/animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [slider],
})
export class ProductsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
