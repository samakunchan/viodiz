import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  permissionOnly: [string?, string?, string?, string?];
}
export const ROUTES: RouteInfo[] = [
  {
    path: 'dashboard',
    title: 'Dashboard',
    icon: 'ni-tv-2 text-primary',
    permissionOnly: ['ADMIN', 'MODERATOR', 'USER', 'GUEST'],
    class: '',
  },
  {
    path: 'icons',
    title: 'Icons',
    icon: 'ni-planet text-blue',
    permissionOnly: ['ADMIN', 'MODERATOR', 'USER'],
    class: '',
  },
  {
    path: 'maps',
    title: 'Maps',
    icon: 'ni-pin-3 text-orange',
    permissionOnly: ['ADMIN', 'MODERATOR', 'USER', 'GUEST'],
    class: '',
  },
  {
    path: 'users-management/list-users',
    title: 'List Users',
    icon: 'ni-single-02 text-info',
    permissionOnly: ['ADMIN', 'MODERATOR'],
    class: '',
  },
  {
    path: 'tables',
    title: 'Tables',
    icon: 'ni-bullet-list-67 text-red',
    permissionOnly: ['ADMIN', 'MODERATOR'],
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
  @Input() forRetractedSideBar;
  @Output() infoRetracted = new EventEmitter<boolean>();
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  constructor(private router: Router) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe(event => {
      this.isCollapsed = true;
    });
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
