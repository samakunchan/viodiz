export class Products {
  title: string;
  coursesId: string;
  timeEstimate: string;
  isCertificated: boolean;
  price: number;
  image: string;
  id?: string;

  clear?(): void {
    this.id = '';
    this.title = '';
    this.coursesId = '';
    this.timeEstimate = '';
    this.price = undefined;
    this.image = '';
    this.isCertificated = undefined;
  }
}
