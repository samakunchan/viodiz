import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { Observable } from 'rxjs';
import { getCurrentRole } from '../../store/selectors/roles.selector';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  permissionOnly: string[];
}
export const ROUTES: RouteInfo[] = [
  {
    path: 'dashboard',
    title: 'BACK.SIDE.DASHBOARD',
    icon: 'ni-tv-2 text-primary',
    permissionOnly: ['CONSTRUCTOR', 'ADMIN', 'MODERATOR', 'USER', 'GUEST'],
    class: '',
  },
  {
    path: 'icons',
    title: 'BACK.SIDE.ICON',
    icon: 'ni-planet text-blue',
    permissionOnly: ['CONSTRUCTOR', 'ADMIN', 'MODERATOR', 'USER'],
    class: '',
  },
  {
    path: 'maps',
    title: 'BACK.SIDE.MAP',
    icon: 'ni-pin-3 text-orange',
    permissionOnly: ['CONSTRUCTOR', 'ADMIN', 'MODERATOR', 'USER', 'GUEST'],
    class: '',
  },
  {
    path: 'users-management/list-users',
    title: 'BACK.SIDE.LISTUSERS',
    icon: 'ni-single-02 text-info',
    permissionOnly: ['CONSTRUCTOR', 'ADMIN', 'MODERATOR'],
    class: '',
  },
  {
    path: 'tables',
    title: 'BACK.SIDE.TABLE',
    icon: 'ni-bullet-list-67 text-red',
    permissionOnly: ['CONSTRUCTOR', 'ADMIN', 'MODERATOR'],
    class: '',
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  public innerWidth: any;
  public role$: Observable<any>;
  public loading = true;
  @Input() forRetractedSideBar;
  @Output() infoRetracted = new EventEmitter<boolean>();
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe(event => {
      this.isCollapsed = true;
    });
    this.role$ = this.store.select(getCurrentRole);
  }

  onToggleSideBar() {
    switch (this.forRetractedSideBar) {
      case true:
        this.forRetractedSideBar = false;
        this.infoRetracted.emit(false);
        break;
      case false:
        this.forRetractedSideBar = true;
        this.infoRetracted.emit(true);
        break;
      default:
        this.forRetractedSideBar = true;
        this.infoRetracted.emit(true);
        break;
    }
  }
}
