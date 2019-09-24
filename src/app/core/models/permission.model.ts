export class Permission {
  id: number;
  title: string;
  level: number;
  name: string;

  clear?(): void {
    this.id = undefined;
    this.title = '';
    this.level = 1;
    this.name = '';
  }
}
