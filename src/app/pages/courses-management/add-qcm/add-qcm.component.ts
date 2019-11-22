import { Component, OnInit } from '@angular/core';
import { zoomInOnEnterAnimation, zoomOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-add-qcm',
  templateUrl: './add-qcm.component.html',
  styleUrls: ['./add-qcm.component.scss'],
  animations: [zoomInOnEnterAnimation(), zoomOutOnLeaveAnimation()],
})
export class AddQcmComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
