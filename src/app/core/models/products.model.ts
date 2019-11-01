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

  // Ajouter date d'expiration
  // Ajouter date description
  // Ajouter barre de progression
  // Ajouter barre lvl du produit de formation
  // Faire de petit module avec moteur de recherche
  // Faire de petit qcm avec moteur de recherche
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
