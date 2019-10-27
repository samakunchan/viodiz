import { Courses } from './courses.model';

export class Products {
  title: string;
  coursesId: string;
  timeEstimate: string;
  isCertificated: boolean;
  price: number;
  image: string;
  courseInCatalog: Courses;
  id?: string;

  clear?(): void {
    this.id = '';
    this.title = '';
    this.coursesId = '';
    this.timeEstimate = '';
    this.price = undefined;
    this.image = '';
    this.isCertificated = undefined;
    this.courseInCatalog = new Courses();
    this.courseInCatalog.clear();
  }
}
