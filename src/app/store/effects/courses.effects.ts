import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AllCoursesLoaded, AppState, CoursesActionTypes, RequestLoadCourses, selectAllCourses, selectCoursesLoaded } from '..';
import { Courses } from '../../core';
import { CoursesService } from '../../core/services/courses.service';
import { CourseSelected, RequestOneCourse } from '../actions/courses.actions';

@Injectable()
export class CoursesEffects implements OnInitEffects {
  @Effect()
  loadCourses$ = this.actions$.pipe(
    ofType<RequestLoadCourses>(CoursesActionTypes.RequestLoadCourses),
    withLatestFrom(this.store.select(selectCoursesLoaded)),
    filter(([_, loaded]) => !loaded),
    switchMap(() => this.coursesService.listCourses().pipe(map((result: Courses[]) => new AllCoursesLoaded({ courses: result })))),
  );

  @Effect({ dispatch: false })
  requestOneCourse$ = this.actions$.pipe(
    ofType<RequestOneCourse>(CoursesActionTypes.RequestOneCourse),
    tap(action => {
      this.store.select(selectAllCourses).subscribe(courses => {
        let course;
        courses.map(data => {
          if (data.id === action.payload.id) {
            return (course = data);
          }
        });
        this.store.dispatch(new CourseSelected({ course: course }));
      });
    }),
  );

  constructor(private actions$: Actions, private store: Store<AppState>, private coursesService: CoursesService) {}

  ngrxOnInitEffects(): Action {
    return { type: CoursesActionTypes.RequestLoadCourses };
  }
}
