import { Component, OnInit } from '@angular/core';
import { zoomInOnEnterAnimation, zoomOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-courses-add',
  templateUrl: './courses-add.component.html',
  styleUrls: ['./courses-add.component.scss'],
  animations: [zoomInOnEnterAnimation(), zoomOutOnLeaveAnimation()],
})
export class CoursesAddComponent implements OnInit {
  buttonAddVideo: string; // TODO Vérifier si j'utilise toujour buttonAddVideo et buttonAddQcm
  buttonAddQcm: string;
  constructor() {}

  ngOnInit() {
    this.buttonAddVideo = this.buttonAddQcm = 'Back';
    // TODO
    //  Faire le CRUD module. Il manque de relier l'update, et de créer un delete
  }
}
