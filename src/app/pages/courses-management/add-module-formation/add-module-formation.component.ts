import { Component, OnInit } from '@angular/core';
import { Videos } from '../../../core/models/videos.model';
import { CoursesService } from '../../../core/services/courses.service';
import { flipInXOnEnterAnimation, zoomInOnEnterAnimation, zoomOutOnLeaveAnimation } from 'angular-animations';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Courses } from '../../../core';
import { Quizz } from '../../../core/models/quizz.model';
import { VideosService } from '../../../core/services/videos.service';
import { QuizzService } from '../../../core/services/quizz.service';

@Component({
  selector: 'app-add-module-formation',
  templateUrl: './add-module-formation.component.html',
  styleUrls: ['./add-module-formation.component.scss'],
  animations: [zoomInOnEnterAnimation(), zoomOutOnLeaveAnimation(), flipInXOnEnterAnimation()],
})
export class AddModuleFormationComponent implements OnInit {
  sources: any[];
  sources1: any[];
  selected: boolean;
  target: any[];
  searchText: any;
  active1: boolean;
  active2: boolean;
  height: string;
  coursesForm: FormGroup;
  course: Courses;
  title: string;
  constructor(
    private coursesServices: CoursesService,
    private videosService: VideosService,
    private quizzService: QuizzService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.title = 'Hello, there';
    this.selected = false;
    this.target = [];
    this.active1 = true;
    this.active2 = false;
    this.height = '300px';
    this.videosService.listVideos().subscribe((res: any) => {
      if (res.datas && res.arrayTitle) {
        this.sources = res.datas;
      }
    });
    this.quizzService.listQuizz().subscribe((res: any) => {
      if (res.datas && res.arrayTitle) {
        this.sources1 = res.datas;
        console.log(this.sources1);
      }
    });
    this.initForm();
  }
  initForm() {
    this.coursesForm = this.formBuilder.group({
      headTitle: ['', [Validators.required, Validators.minLength(3)]],
      modulesCourses: this.formBuilder.array([this.createModulesCourses()]),
    });
  }
  createModulesCourses() {
    return this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      videoQcmSelected: this.formBuilder.array([this.createVideoQcm()]),
      search: [''],
    });
  }
  addModulesCourses() {
    const control = <FormArray>this.coursesForm.controls['modulesCourses'];
    control.push(this.createModulesCourses());
  }
  removeModulesCourses(index) {
    const modulesCourses = this.coursesForm.get('modulesCourses') as FormArray;
    modulesCourses.removeAt(index);
  }
  createVideoQcm() {
    return this.formBuilder.group({
      id: ['', Validators.compose([Validators.required])],
      videoTitle: ['', [Validators.minLength(5)]],
      videoUrl: ['', [Validators.minLength(5)]],
    });
  }
  addVideoQcm(ix) {
    const control = (<FormArray>this.coursesForm.controls['modulesCourses']).at(ix).get('videoQcmSelected') as FormArray;
    control.push(this.createVideoQcm());
  }
  removeVideoQcm(ix, iy) {
    const control = (<FormArray>this.coursesForm.controls['modulesCourses']).at(ix).get('videoQcmSelected') as FormArray;
    control.removeAt(iy);
  }

  onCancel(indexModule: number, indexVideo: number) {
    this.target[indexModule].splice(indexVideo, 1);
    this.removeVideoQcm(indexModule, indexVideo);
  }
  onDropped(newItems, index) {
    this.target[index] = newItems;
    this.coursesForm.value.modulesCourses[index].videoQcmSelected = newItems;
  }

  /**
   * Pour le tableau de droite
   * @param list: any
   * @param item: any
   * @param index: number
   */
  selectItem(list: Array<any>, item: any, index: number) {
    // Si le tableau existe
    if (Array.isArray(this.target[index])) {
      // on vérifie si l'item n'exite pas dans ce tableau afin d'éviter les doublons.
      const found = this.target[index].find(res => {
        return res === item;
      });
      // Si l'item exite, il ne fait pas de push supplémentaire pour éviter les doublons
      if (found) {
        return;
      } else {
        this.target[index].push(item);
        this.addVideoQcm(index);
      }
    } else {
      // Si le tableau n'existe pas
      this.target.push([]); // On push un tableau vide
      this.target[index].push(item); // et mettre tout de suite l'item dedans
      this.addVideoQcm(index);
    }
  }
  onDeleteVideo(video: Videos) {
    this.sources = this.arrayRemove(this.sources, video);
    this.videosService.deleteVideos(video);
  }
  onDeleteQuizz(quizz: Quizz) {
    this.sources1 = this.arrayRemove(this.sources1, quizz);
    this.quizzService.deleteQuizz(quizz);
  }
  arrayRemove(arr, value) {
    return arr.filter(ele => {
      return ele !== value;
    });
  }
  onTabVideo() {
    this.active1 = true;
    this.active2 = false;
  }
  onTabQcm() {
    this.active1 = false;
    this.active2 = true;
  }
  // TODO Faire l'update des vidéos et quizz
  onSubmit() {
    console.log(this.coursesForm.value);
    console.table(this.coursesForm.value.modulesCourses[0].videoQcmSelected);
  }
}
