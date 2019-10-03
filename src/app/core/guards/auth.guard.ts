import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgxRolesService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private ngxRolesService: NgxRolesService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // A remplacer avec le NGRX
    const isLoggin = true;
    console.assert(isLoggin, 'Il est connecter');
    this.ngxRolesService.roles$.subscribe(data => {
      if (!isLoggin) {
        this.router.navigate(['auth', 'login']);
      }
    });
    return true;
  }
}
