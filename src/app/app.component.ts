import { Component, OnDestroy } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NavigationCancel, NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';

import { enLang, frLang, Permission, Role } from './core/';
import { TranslationService } from './core/services/translation.service';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { PermissionService } from './core/services/permission.service';
import { RoleService } from './core/services/role.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'Viodiz';
  logo = 'assets/img/brand/logo-viodiz.png';
  roles: Role[];
  permissions: Permission[];
  roleSubscription: Subscription;
  permissionSubscription: Subscription;

  /**
   * App constructor
   * @param loader: LoadingBarService
   * @param router: Router
   * @param translationService: translationService
   * @param ngxPermissionsService: NgxPermissionsService
   * @param ngxRolesService: NgxRolesService
   * @param permissionService: PermissionService
   * @param roleService: RoleService
   */
  constructor(
    private loader: LoadingBarService,
    private router: Router,
    private translationService: TranslationService,
    private ngxPermissionsService: NgxPermissionsService,
    private ngxRolesService: NgxRolesService,
    private permissionService: PermissionService,
    private roleService: RoleService,
  ) {
    // Chargement des rôles
    this.roleSubscription = this.roleService.roleSubject.subscribe((role: Role[]) => {
      this.roles = role;
      this.roles.map(res => {
        if (res.name === 'ADMIN') {
          return this.ngxRolesService.addRole(res.name, res.permissions);
        }
      });
    });
    this.roleService.emitRole();

    // Chargement des permssions
    this.permissionSubscription = this.permissionService.permissionSubject.subscribe((permissions: []) => {
      this.permissions = permissions;
      const permTitle = this.permissions.map(res => {
        return res.title;
      });
      this.ngxPermissionsService.addPermission(permTitle);
    });
    this.permissionService.emitPermission();

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
