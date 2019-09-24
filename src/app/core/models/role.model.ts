import { Permission } from './permission.model';

export class Role {
  name: string;
  permissions: [string];

  clear?(): void {
    this.name = '';
    this.permissions = [''];
  }
}
