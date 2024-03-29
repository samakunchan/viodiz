import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nucleo-section',
  templateUrl: './nucleo-section.component.html',
  styleUrls: ['./nucleo-section.component.css'],
})
export class NucleoSectionComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const nucleoView = document.getElementsByClassName('icons-container')[0];
    window.addEventListener(
      'scroll',
      function() {
        if (this.isInViewport(nucleoView)) {
          nucleoView.classList.add('on-screen');
        } else {
          nucleoView.classList.remove('on-screen');
        }
      }.bind(this),
      false,
    );
  }
  isInViewport(elem) {
    const bounding = elem.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}
