import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../core/services/courses.service';
import { Observable } from 'rxjs';
import { Courses } from '../../../core';
import { Store } from '@ngrx/store';
import { AppState, selectAllCourses } from '../../../store';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  public courses$: Observable<Courses[]>;
  constructor(private coursesServices: CoursesService, private store: Store<AppState>) {}

  ngOnInit() {
    this.courses$ = this.store.select(selectAllCourses);
  }
}
