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
    permissionOnly: [],
    class: '',
  },
  {
    path: 'user-profile',
    title: 'Profile',
    icon: 'ni-circle-08 text-info',
    permissionOnly: [],
    class: '',
  },
  {
    path: 'catalog',
    title: 'Catalog',
    icon: 'ni-collection text-danger',
    permissionOnly: [],
    class: '',
  },
  {
    path: 'faq',
    title: 'F.A.Q',
    icon: 'ni-ui-04 text-info',
    permissionOnly: [],
    class: '',
  },
  {
    path: 'comments',
    title: 'Commentaires',
    icon: 'ni-chat-round text-warning',
    permissionOnly: [],
    class: '',
  },
];
// rajouter "Groupes" pour les animators
// rajouter "Formation" pour les user premium
// rajouter "start" pour les infos de départ
// rajouter "commentaire" pour les récolter les commentaires des users
export const ROUTESADMINONLY: RouteInfo[] = [
  {
    path: 'users-management/users/list',
    title: 'BACK.SIDE.LISTUSERS',
    icon: 'fa fa-group text-info',
    permissionOnly: ['CONSTRUCTOR', 'ADMIN', 'MODERATOR', 'EMPLOYEE'],
    class: '',
  },
  {
    path: 'courses-management/courses/list',
    title: 'Courses',
    icon: 'ni-ruler-pencil text-primary',
    permissionOnly: ['CONSTRUCTOR', 'ADMIN', 'MODERATOR', 'EMPLOYEE'],
    class: '', // Les qcm seront dans la même page
  },
  {
    path: 'products-management/products/list',
    title: 'Products',
    icon: 'ni-archive-2 text-orange',
    permissionOnly: ['CONSTRUCTOR', 'ADMIN', 'MODERATOR', 'EMPLOYEE'],
    class: '',
  },
  // gestion du "get started"
];
export const ROUTESBASIC: RouteInfo[] = [
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
  public basics: any[];
  public adminOnly: any[];
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
    this.adminOnly = ROUTESADMINONLY.filter(menuItem => menuItem);
    this.basics = ROUTESBASIC.filter(menuItem => menuItem);
    this.router.events.subscribe(() => {
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
