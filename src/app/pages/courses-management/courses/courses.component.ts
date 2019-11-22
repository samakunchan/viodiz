import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider } from '../../../core/animations/animation';
import { zoomInOnEnterAnimation, zoomOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  animations: [slider, zoomInOnEnterAnimation(), zoomOutOnLeaveAnimation()],
})
export class CoursesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
