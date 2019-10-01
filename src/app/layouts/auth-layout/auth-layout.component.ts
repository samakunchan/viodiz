import { Component, OnInit, OnDestroy, HostListener, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  test: Date = new Date();
  public isCollapsed = true;

  constructor(private router: Router, private renderer: Renderer2, private element: ElementRef) { }

  ngOnInit() {
    const html = document.getElementsByTagName('html')[0];
    html.classList.add('auth-layout');
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('bg-blue');
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
  ngOnDestroy() {
    const html = document.getElementsByTagName('html')[0];
    html.classList.remove('auth-layout');
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('bg-blue');
  }
}
