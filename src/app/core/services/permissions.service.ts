import { Injectable } from '@angular/core';
import { Permissions } from '..';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  permissionSubject = new Subject<Permissions[]>();
  private permissions: Permissions[] = [
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

  emitPermission() {
    this.permissionSubject.next(this.permissions);
  }

  getAllPermissions() {
    return of(this.permissions);
  }
}
