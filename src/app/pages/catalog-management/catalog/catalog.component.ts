import { Component, OnInit } from '@angular/core';
import { slider } from '../../../core/animations/animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  animations: [slider],
})
export class CatalogComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
