export class Videos {
  id?: string;
  title: string;
  url: string;
  type: string;
  clear?(): void {
    this.id = '';
    this.title = '';
    this.url = '';
    this.type = '';
  }
}
