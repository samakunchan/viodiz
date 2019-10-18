import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState, currentUser } from '../../store';
import { Observable } from 'rxjs';
import { AuthUser } from '../../core';

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
  public user$: Observable<AuthUser>;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }
  constructor(public location: Location, private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.user$ = this.store.select(currentUser);
    this.router.events.subscribe(event => {
      this.isCollapsed = true;
      if (event instanceof NavigationStart) {
        if (event.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
        }
      } else if (event instanceof NavigationEnd) {
        if (event.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else {
          window.scrollTo(0, 0);
        }
      }
    });
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
  }
}
