export class Roles {
  name: string;
  permissions: string[];

  clear?(): void {
    this.name = '';
    this.permissions = [''];
  }
}
