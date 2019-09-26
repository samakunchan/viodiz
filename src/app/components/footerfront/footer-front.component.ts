import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-front',
  templateUrl: './footer-front.component.html',
  styleUrls: ['./footer-front.component.scss'],
})
export class FooterFrontComponent implements OnInit {
  test: Date = new Date();
  landingPage = {
    src: './assets/img/theme/landing.jpg',
    alt: 'Landing page',
  };
  profilePage = {
    src: './assets/img/theme/profile.jpg',
    alt: 'Profile page',
  };
  constructor(private router: Router) {}

  ngOnInit() {}
  getPath() {
    return this.router.url;
  }
}
