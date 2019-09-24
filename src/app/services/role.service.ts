import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Role } from '../core';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  roleSubject = new Subject<Role[]>();

  // A remplacer par la BDD
  private role = [
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

  loadRole() {
    return new Observable(observer => {
      const data = this.role.map((res: Role) => {
        return res;
      });
      observer.next(data);
      if (data.length <= 0) {
        observer.error('Les roles sont manquantes');
      }
    });
  }
}
