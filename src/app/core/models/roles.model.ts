export class Roles {
  name: string;
  permissions: [];

  clear?(): void {
    this.name = '';
    this.permissions = [];
  }
}
