import { Courses } from '../../core';
import { CoursesActions, CoursesActionTypes } from '..';

export const coursesFeatureKey = 'courses';

export interface CoursesStateEntity {
  coursesLoading: boolean;
  coursesloaded: boolean;
  data: Courses[] | null;
}

export const initialCoursesState: CoursesStateEntity = {
  coursesLoading: false,
  coursesloaded: false,
  data: undefined,
};

export function coursesReducer(state = initialCoursesState, action: CoursesActions): CoursesStateEntity {
  switch (action.type) {
    case CoursesActionTypes.AllCoursesLoaded:
      return {
        ...state,
        data: action.payload.courses,
        coursesLoading: false,
        coursesloaded: true,
      };
    default:
      return state;
  }
}
