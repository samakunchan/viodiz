import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-front',
  templateUrl: './footer-front.component.html',
  styleUrls: ['./footer-front.component.scss'],
})
export class FooterFrontComponent implements OnInit {
  test: Date = new Date();

  constructor(private router: Router) {}

  ngOnInit() {}
  getPath() {
    return this.router.url;
  }
}
