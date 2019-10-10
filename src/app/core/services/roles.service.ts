import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Roles } from '..';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  roleSubject = new Subject<Roles[]>();
  private roles: Roles[] = [
    {
      name: 'CONSTRUCTOR',
      permissions: ['fullAccessUserManagement', 'canDeleteUserManagement', 'canUpdateUserManagement', 'canReadUserManagement'],
    },
    {
      name: 'ADMIN',
      permissions: ['fullAccessUserManagement', 'canDeleteUserManagement', 'canUpdateUserManagement', 'canReadUserManagement'],
    },
    {
      name: 'MODERATOR',
      permissions: ['canDeleteUserManagement', 'canUpdateUserManagement', 'canReadUserManagement'],
    },
    {
      name: 'USER',
      permissions: ['canReadUserManagement'],
    },
    {
      name: 'GUEST',
      permissions: [],
    },
  ];
  constructor() {}

  emitRole() {
    this.roleSubject.next(this.roles);
  }

  getAllRoles(): Observable<Roles[]> {
    return of(this.roles);
  }
}
