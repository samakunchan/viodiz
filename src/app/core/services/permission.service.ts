import { Injectable } from '@angular/core';
import { Permission } from '..';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  permissionSubject = new Subject<Permission[]>();
  private permissions: Permission[] = [];

  constructor(private afs: AngularFirestore) {
    this.getAllPermission();
  }

  emitPermission() {
    this.permissionSubject.next(this.permissions);
  }

  private getAllPermission() {
    this.afs
      .collection<Permission>('Permissions')
      .valueChanges()
      .subscribe(permissions => {
        this.permissions = permissions ? permissions : [];
        this.emitPermission();
      });
  }
}
