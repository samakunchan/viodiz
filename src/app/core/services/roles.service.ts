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
      permissions: [
        'canSeeListUserPage',
        'canAddUser',
        'canEditUser',
        'canDeleteUser',
        'canSeeCoursePage',
        'canAddCourse',
        'canEditCourse',
        'canDeleteCourse',
        'canSeeProductPageList',
        'canAddProduct',
        'canEditProduct',
        'canDeleteProduct',
        'canSeeGroupePage',
        'canEditGroupe',
        'canDeleteGroupe',
        'canAccessToGroupe',
        'canSeeQCMPage',
        'canAddQCM',
        'canEditQCM',
        'canDeleteQCM',
        'canSeeFormationPage',
        'canEditQCMFormationPage',
        'canSeeGetStartedPageAdmin',
        'canEditGetStarted',
        'canSeeRoleStatus',
        'canEditRoleStatus',
      ],
    },
    {
      name: 'ADMIN',
      permissions: [
        'canSeeListUserPage',
        'canAddUser',
        'canEditUser',
        'canDeleteUser',
        'canSeeCoursePage',
        'canAddCourse',
        'canEditCourse',
        'canDeleteCourse',
        'canSeeProductPageList',
        'canAddProduct',
        'canEditProduct',
        'canDeleteProduct',
        'canSeeGroupePage',
        'canEditGroupe',
        'canDeleteGroupe',
        'canAccessToGroupe',
        'canSeeQCMPage',
        'canAddQCM',
        'canEditQCM',
        'canDeleteQCM',
        'canSeeFormationPage',
        'canEditQCMFormationPage',
        'canSeeGetStartedPageAdmin',
        'canEditGetStarted',
        'canSeeRoleStatus',
        'canEditRoleStatus',
      ],
    },
    {
      name: 'MODERATOR',
      permissions: [
        'canSeeListUserPage',
        'canAddUser',
        'canEditUser',
        'canSeeCoursePage',
        'canAddCourse',
        'canEditCourse',
        'canSeeProductPageList',
        'canAddProduct',
        'canEditProduct',
        'canSeeGroupePage',
        'canEditGroupe',
        'canAccessToGroupe',
        'canSeeQCMPage',
        'canAddQCM',
        'canEditQCM',
        'canSeeFormationPage',
        'canEditQCMFormationPage',
        'canSeeGetStartedPageAdmin',
        'canEditGetStarted',
      ],
    },
    {
      name: 'EMPLOYEE',
      permissions: [
        'canSeeListUserPage',
        'canSeeCoursePage',
        'canSeeProductPageList',
        'canSeeGroupePage',
        'canEditGroupe',
        'canAccessToGroupe',
        'canSeeQCMPage',
        'canAddQCM',
        'canEditQCM',
        'canSeeFormationPage',
        'canEditQCMFormationPage',
        'canSeeGetStartedPageAdmin',
        'canEditGetStarted',
      ],
    },
    {
      name: 'USER ANIMATOR PREMIUM',
      permissions: [
        'canSeeGroupePage',
        'canEditGroupe',
        'canAccessToGroupe',
        'canSeeQCMPage',
        'canAddQCM',
        'canEditQCM',
        'canSeeFormationPage',
        'canEditQCMFormationPage',
      ],
    },
    {
      name: 'USER PREMIUM',
      permissions: [
        'canAccessToGroupe',
        'canSeeQCMPage',
        'canAddQCM',
        'canEditQCM',
        'canSeeFormationPage',
        'canEditQCMFormationPage',
      ],
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
