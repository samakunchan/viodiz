import { Injectable } from '@angular/core';
import { Permissions } from '..';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// 1 premium
// 2 premium animator
// 3 employee
// 4 moderateur
// 5 admin ou dev
export class PermissionsService {
  permissionSubject = new Subject<Permissions[]>();
  private permissions: Permissions[] = [
    {
      // user list
      id: 0,
      title: 'canSeeListUserPage',
      level: 3,
      name: 'User Management list',
    },
    {
      id: 2,
      title: 'canAddUser',
      level: 4,
      name: 'User Management add',
    },
    {
      id: 3,
      title: 'canEditUser',
      level: 4,
      name: 'User Management edit',
    },
    {
      id: 4,
      title: 'canDeleteUser',
      level: 5,
      name: 'User Management del',
    },
    {
      // courses admin
      id: 5,
      title: 'canSeeCoursePage',
      level: 3,
      name: 'Course Management list',
    },
    {
      id: 6,
      title: 'canAddCourse',
      level: 4,
      name: 'Course Management add',
    },
    {
      id: 7,
      title: 'canEditCourse',
      level: 4,
      name: 'Course Management edit',
    },
    {
      id: 8,
      title: 'canDeleteCourse',
      level: 5,
      name: 'Course Management del',
    },
    {
      // product
      id: 9,
      title: 'canSeeProductPageList',
      level: 3,
      name: 'Product Management list',
    },
    {
      id: 10,
      title: 'canAddProduct',
      level: 4,
      name: 'Product Management add',
    },
    {
      id: 11,
      title: 'canEditProduct',
      level: 4,
      name: 'Product Management edit',
    },
    {
      id: 12,
      title: 'canDeleteProduct',
      level: 5,
      name: 'Product Management del',
    },
    {
      // groupes
      id: 13,
      title: 'canSeeGroupePage',
      level: 2,
      name: 'Groupe Management page for animator',
    },
    {
      id: 14,
      title: 'canEditGroupe',
      level: 2,
      name: 'Groupe Management edit',
    },
    {
      id: 15,
      title: 'canDeleteGroupe',
      level: 2,
      name: 'Groupe Management del',
    },
    {
      id: 16,
      title: 'canAccessToGroupe',
      level: 1,
      name: 'Groupe Management access for user',
    },
    {
      id: 17,
      title: 'canSeeQCMPage',
      level: 3,
      name: 'QCM Management see',
    },
    {
      id: 18,
      title: 'canAddQCM',
      level: 4,
      name: 'QCM Management add',
    },
    {
      id: 19,
      title: 'canEditQCM',
      level: 4,
      name: 'QCM Management edit',
    },
    {
      id: 20,
      title: 'canDeleteQCM',
      level: 5,
      name: 'QCM Management del',
    },
    {
      id: 21,
      title: 'canSeeFormationPage',
      level: 3,
      name: 'QCM Management see',
    },
    {
      id: 22,
      title: 'canEditQCMFormationPage',
      level: 4,
      name: 'QCM Management edit user exam',
    },
    {
      id: 23,
      title: 'canSeeGetStartedPageAdmin',
      level: 3,
      name: 'Get start constructor',
    },
    {
      id: 24,
      title: 'canEditGetStarted',
      level: 3,
      name: 'Get Started Management',
    },
    {
      id: 25,
      title: 'canAddFAQ',
      level: 3,
      name: 'QCM Management edit user exam',
    },
    {
      id: 26,
      title: 'canEditFAQ',
      level: 3,
      name: 'QCM Management edit user exam',
    },
    {
      id: 27,
      title: 'canDelFAQ',
      level: 3,
      name: 'QCM Management edit user exam',
    },
    {
      id: 28,
      title: 'canSeeRoleStatus',
      level: 5,
      name: 'Role Management',
    },
    {
      id: 29,
      title: 'canEditRoleStatus',
      level: 5,
      name: 'Role Management change role',
    },
    // possiblement: canSeeInvoicement (facture)
    // possiblement: canCertificate (diplome)
  ];

  constructor() {}

  emitPermission() {
    this.permissionSubject.next(this.permissions);
  }

  getAllPermissions() {
    return of(this.permissions);
  }
}
