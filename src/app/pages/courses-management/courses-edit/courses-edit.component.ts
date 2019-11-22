import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { zoomInOnEnterAnimation, zoomOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-courses-edit',
  templateUrl: './courses-edit.component.html',
  styleUrls: ['./courses-edit.component.scss'],
  animations: [zoomInOnEnterAnimation(), zoomOutOnLeaveAnimation()],
})
export class CoursesEditComponent implements OnInit {
  public action;
  public id;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.action = this.route.snapshot.params.action;
    this.id = this.route.snapshot.params.id;
    console.log(this.action, this.id);
  }
}
