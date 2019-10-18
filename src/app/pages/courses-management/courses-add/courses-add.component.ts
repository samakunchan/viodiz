import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Courses } from '../../../core';
import { CoursesService } from '../../../core/services/courses.service';

@Component({
  selector: 'app-courses-add',
  templateUrl: './courses-add.component.html',
  styleUrls: ['./courses-add.component.scss'],
})
export class CoursesAddComponent implements OnInit {
  coursesForm: FormGroup;
  course: Courses;
  constructor(private formBuilder: FormBuilder, private coursesServices: CoursesService) {}

  ngOnInit() {
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
      titleModule: ['', Validators.compose([Validators.required])],
      chapters: this.formBuilder.array([this.createChapters()]),
    });
  }
  createChapters() {
    return this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      video: ['', [Validators.minLength(5)]],
    });
  }
  addModulesCourses() {
    const control = <FormArray>this.coursesForm.controls['modulesCourses'];
    control.push(this.createModulesCourses());
  }
  addChapters(ix) {
    const control = (<FormArray>this.coursesForm.controls['modulesCourses']).at(ix).get('chapters') as FormArray;
    control.push(this.createChapters());
  }
  removeModulesCourses(ix) {
    const modulesCourses = this.coursesForm.get('modulesCourses') as FormArray;
    modulesCourses.removeAt(ix);
  }
  removeChapters(ix, iy) {
    const control = (<FormArray>this.coursesForm.controls['modulesCourses']).at(ix).get('chapters') as FormArray;
    control.removeAt(iy);
  }

  onSubmit() {
    this.course = new Courses();
    this.course.clear();
    this.course.title = this.coursesForm.value['headTitle'];
    this.course.modules = this.coursesForm.value['modulesCourses'];
    console.log(this.coursesForm.value['modulesCourses']);
    console.log(this.course);
    // Enregistrer le cours
    this.coursesServices
      .createCourses(this.course)
      .then(res => {
        if (res) {
          console.log('Document envoyer!!');
        }
      })
      .catch(err => console.error(err));
  }
}
