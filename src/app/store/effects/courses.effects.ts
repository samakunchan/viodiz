import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AllCoursesLoaded, AppState, CoursesActionTypes, RequestLoadCourses, selectCoursesLoaded } from '..';
import { Courses } from '../../core';
import { CoursesService } from '../../core/services/courses.service';

@Injectable()
export class CoursesEffects implements OnInitEffects {
  @Effect()
  loadCourses$ = this.actions$.pipe(
    ofType<RequestLoadCourses>(CoursesActionTypes.RequestLoadCourses),
    withLatestFrom(this.store.select(selectCoursesLoaded)),
    filter(([_, loaded]) => !loaded),
    switchMap(() => this.coursesService.listCourses().pipe(map((result: Courses[]) => new AllCoursesLoaded({ courses: result })))),
  );

  constructor(private actions$: Actions, private store: Store<AppState>, private coursesService: CoursesService) {}

  ngrxOnInitEffects(): Action {
    return { type: CoursesActionTypes.RequestLoadCourses };
  }
}
