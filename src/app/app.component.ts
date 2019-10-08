import { Component, OnDestroy } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NavigationCancel, NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { enLang, frLang, Permissions, Roles } from './core/';
import { TranslationService } from './core/services/translation.service';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { PermissionsService } from './core/services/permissions.service';
import { RolesService } from './core/services/roles.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, getAllPermissions, getAllRoles } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'Viodiz';
  logo = 'assets/img/brand/logo-viodiz.png';
  roles$: Observable<Roles[]>;
  permissions: Observable<Permissions[]>;
  roleSubscription: Subscription;
  permissionSubscription: Subscription;

  /**
   * App constructor
   * @param loader: LoadingBarService
   * @param router: Router
   * @param translationService: translationService
   * @param ngxPermissionsService: NgxPermissionsService
   * @param ngxRolesService: NgxRolesService
   * @param permissionService: PermissionsService
   * @param roleService: RoleService
   * @param store: Store
   */
  constructor(
    private loader: LoadingBarService,
    private router: Router,
    private translationService: TranslationService,
    private ngxPermissionsService: NgxPermissionsService,
    private ngxRolesService: NgxRolesService,
    private permissionService: PermissionsService,
    private roleService: RolesService,
    private store: Store<AppState>,
  ) {
    // Chargement des permssions avec ngrx
    this.permissions = this.store.select(getAllPermissions);
    this.permissionSubscription = this.permissions.subscribe(permissions => {
      const permTitle = permissions.map(res => {
        return res.title;
      });
      this.ngxPermissionsService.addPermission(permTitle);
    });

    // Chargement des rôles avec ngrx
    this.roles$ = this.store.select(getAllRoles);
    this.roleSubscription = this.roles$.subscribe(roles => {
      roles.map(res => {
        if (res.name === 'ADMIN') {
          return this.ngxRolesService.addRole(res.name, res.permissions);
        }
      });
    });

    // Chargement de la traduction
    this.translationService.loadTranslations(enLang, frLang);

    // Barre de progression en %
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // start la barre de progression sur NavigationStart de l'event router
        this.loader.start();
      }
      if (event instanceof RouteConfigLoadStart) {
        this.loader.increment(35);
      }
      if (event instanceof RouteConfigLoadEnd) {
        this.loader.increment(75);
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        // termine la barre de progression sur NavigationEnd de l'event router
        this.loader.complete();
      }
    });
  }

  ngOnDestroy(): void {
    this.roleSubscription.unsubscribe();
    this.permissionSubscription.unsubscribe();
  }
}
