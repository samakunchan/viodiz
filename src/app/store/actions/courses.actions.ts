import { Action } from '@ngrx/store';
import { Courses } from '../../core';

export enum CoursesActionTypes {
  RequestLoadCourses = '[Courses API] Request Load Courses',
  AddCourses = '[Courses API] Add Courses',
  UpdateCourses = '[Courses API] Update Courses',
  DeleteCourses = '[Courses API] Delete Courses',
  AllCoursesLoaded = '[Courses API] All Loaded Courses',
  RequestOneCourse = '[Request for one course] action',
  CourseSelected = '[Course current course] Courses selected',
}

export class RequestLoadCourses implements Action {
  readonly type = CoursesActionTypes.RequestLoadCourses;
}
export class AllCoursesLoaded implements Action {
  readonly type = CoursesActionTypes.AllCoursesLoaded;
  constructor(public payload: { courses: Courses[] }) {}
}
export class RequestOneCourse implements Action {
  readonly type = CoursesActionTypes.RequestOneCourse;
  constructor(public payload: { id: string }) {}
}
export class CourseSelected implements Action {
  readonly type = CoursesActionTypes.CourseSelected;
  constructor(public payload: { course: Courses }) {}
}
export class AddCourses implements Action {
  readonly type = CoursesActionTypes.AddCourses;
  constructor(public payload: { courses: Courses[] }) {}
}
export class UpdateCourses implements Action {
  readonly type = CoursesActionTypes.UpdateCourses;
  constructor(public payload: { courses: Courses[] }) {}
}
export class DeleteCourses implements Action {
  readonly type = CoursesActionTypes.DeleteCourses;
  constructor(public payload: { id: number }) {}
}

export type CoursesActions = RequestLoadCourses | AddCourses | UpdateCourses | DeleteCourses | AllCoursesLoaded | RequestOneCourse | CourseSelected;
