import { Component } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NavigationCancel, NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';

import { enLang, frLang, Role } from './core/';
import { TranslationService } from './services/translation.service';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { PermissionService } from './services/permission.service';
import { RoleService } from './services/role.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Angular template';
  logo = 'assets/img/brand/logo-viodiz.png';

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
    // On charge les permissions et le rôle utilisateur sélectionné.
    this.permissionService.loadPermission().subscribe((perm: []) => {
      this.ngxPermissionsService.addPermission(perm);
    });

    this.roleService.loadRole().subscribe((role: []) => {
      role.map((res: Role) => {
        // 'USER' à remplacer avec la valeur de la BDD
        if (res.name === 'USER') {
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
}
