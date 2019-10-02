import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public front = {
    logo: {
      src: './assets/img/brand/logo-viodiz-mini.png',
      alt: 'Logo',
    },
    bg: {
      src: '../assets/img/misc/bg-2.jpg',
      ill: '../assets/img/ill/ill-2.svg',
      google: '../assets/img/icons/common/google.svg'
    }
  };
  constructor() {}

  ngOnInit() {}
  ngOnDestroy() {}
}
