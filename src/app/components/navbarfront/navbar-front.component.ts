import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';

@Component({
  selector: 'app-navbar-front',
  templateUrl: './navbar-front.component.html',
  styleUrls: ['./navbar-front.component.scss'],
})
export class NavbarFrontComponent implements OnInit {
  public isCollapsed = true;
  private innerWidth: any;
  private lastPoppedUrl: any;
  private yScrollStack: number[] = [];
  public front = {
    logo: {
      src: './assets/img/brand/logo-viodiz-mini.png',
      alt: 'Logo',
    },
  };
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }
  constructor(public location: Location, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      console.log(event)
      this.isCollapsed = true;
      if (event instanceof NavigationStart) {
        console.log('NavigationStart')
        if (event.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
          console.log(this.yScrollStack)
        }
      } else if (event instanceof NavigationEnd) {
        console.log('NavigationEnd')
        if (event.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
          console.log(this.yScrollStack)
        } else {
          window.scrollTo(0, 0);
          console.log('window.scrollTo(0, 0)')
        }
      }
    });
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
  }

  isHome() {
    const titlee = this.location.prepareExternalUrl(this.location.path());

    return titlee === '#/home';
  }
  isDocumentation() {
    const titlee = this.location.prepareExternalUrl(this.location.path());
    return titlee === '#/documentation';
  }
}
