export class Chapters {
  title: string;
  video: string;
  clear(): void {
    this.title = '';
    this.video = '';
  }
}

export class Modules {
  title: string;
  chapters: Chapters;
  clear() {
    this.title = '';
    this.chapters = new Chapters();
  }
}
