import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-course',
  templateUrl: './card-course.component.html',
  styleUrls: ['./card-course.component.scss'],
})
export class CardCourseComponent implements OnInit {
  @Input() productId;
  @Input() coursesId;
  @Input() productImage;
  @Input() productIsCertificated;
  @Input() productPrice;
  @Input() productTimeEstimate;
  @Input() productTitle;
  // Rajouter le lvl
  // Rajouter une description
  // Rajouter la barre de progression
  constructor() {}

  ngOnInit() {}

  getImageUrl() {
    return `url(${this.productImage})`;
  }
}
