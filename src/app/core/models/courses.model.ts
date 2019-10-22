import { Modules } from './chapters.model';

export class Courses {
  title: string;
  modules: Modules;
  id?: string;

  clear?(): void {
    this.id = '';
    this.title = '';
    this.modules = new Modules();
    this.modules.clear();
  }
}
