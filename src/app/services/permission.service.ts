import { Injectable } from '@angular/core';
import { Permission } from '../core';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  permissionSubject = new Subject<Permission[]>();

  // A remplacer par la BDD
  private permission = [
    {
      id: 0,
      title: 'fullAccessUserManagement',
      level: 4,
      name: 'User Management',
    },
    {
      id: 1,
      title: 'canDeleteUserManagement',
      level: 3,
      name: 'Employee accreditation',
    },
    {
      id: 2,
      title: 'canUpdateUserManagement',
      level: 2,
      name: 'User accreditation',
    },
    {
      id: 3,
      title: 'canReadUserManagement',
      level: 1,
      name: 'Guest accreditation',
    },
  ];

  constructor() {}

  loadPermission() {
    return new Observable(observer => {
      const data = this.permission.map((res: Permission) => {
        return res.title;
      });
      observer.next(data);
      if (data.length <= 0) {
        observer.error('Les permissions sont manquantes');
      }
    });
  }
}
