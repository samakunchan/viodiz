import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, CoursesStateEntity } from '../index';

const selectCoursesState = createFeatureSelector<AppState, CoursesStateEntity>('courses');

export const selectLoadingCourses = createSelector(
  selectCoursesState,
  courses => courses.coursesLoading,
);
export const selectCoursesLoaded = createSelector(
  selectCoursesState,
  courses => courses.coursesloaded,
);
export const selectAllCourses = createSelector(
  selectCoursesState,
  courses => courses.data,
);
