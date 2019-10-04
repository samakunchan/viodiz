import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Role } from '..';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  roleSubject = new Subject<Role[]>();
  private roles: Role[] = [];

  constructor(private afs: AngularFirestore) {
    this.getAllRoles();
  }

  emitRole() {
    this.roleSubject.next(this.roles);
  }

  private getAllRoles() {
    this.afs
      .collection<Role>('Roles')
      .valueChanges()
      .subscribe(roles => {
        this.roles = roles ? roles : [];
        this.emitRole();
      });
  }
}
