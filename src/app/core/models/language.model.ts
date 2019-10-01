export class Language {
  lang: string;
  name: string;
  flag: string;
  alt: string;

  clear?(): void {
    this.lang = '';
    this.name = '';
    this.flag = '';
    this.alt = '';
  }
}
