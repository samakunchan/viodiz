import { Modules } from './chapters.model';

export class Courses {
  title: string;
  modules: Modules;

  clear?(): void {
    this.title = '';
    this.modules = new Modules();
    this.modules.clear();
  }
}
