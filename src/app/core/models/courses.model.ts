import { Modules } from './chapters.model';

export class Courses {
  title: string;
  modules: Modules;
  productId: string;
  id?: string;

  clear?(): void {
    this.id = '';
    this.title = '';
    this.productId = '';
    this.modules = new Modules();
    this.modules.clear();
  }
}
