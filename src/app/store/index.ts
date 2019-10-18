import { RolesStateEntity } from './reducers/roles.reducer';
import { PermStateEntity } from './reducers/permissions.reducer';
import { AuthStateEntity } from './reducers/auth.reducer';
import { CoursesStateEntity } from './reducers/courses.reducer';

// Tout le store est ici
export interface AppState {
  roles: RolesStateEntity;
  permissions: PermStateEntity;
  authUser: AuthStateEntity;
  courses: CoursesStateEntity;
}
// Actions
export {
  Login,
  Logout,
  AuthActionTypes,
  AuthUserUpdateAddInfos,
  AuthUserLoaded,
  AuthUserRequested,
  CurrentUserUpdatePhoto,
  AuthActions,
  Register,
} from './actions/auth.actions';
export { RequestLoadRoles, RoleSelected, RolesActionTypes, AllRolesLoaded, ErrorLoadRoles, RolesActions } from './actions/roles.actions';
export {
  PermissionsActionTypes,
  RequestLoadPermissions,
  PermissionsActions,
  AllPermissionsLoaded,
  ErrorLoadPermissions,
} from './actions/permissions.actions';
export {
  AllCoursesLoaded,
  AddCourses,
  UpdateCourses,
  DeleteCourses,
  RequestLoadCourses,
  CoursesActionTypes,
  CoursesActions,
} from './actions/courses.actions';
// Reducers
export { rolesReducer, roleFeatureKey, initialRolesState, RolesStateEntity } from './reducers/roles.reducer';
export { permissionsReducer, permissionFeatureKey, initialPermissionsState, PermStateEntity } from './reducers/permissions.reducer';
export { authReducer, authFeatureKey, initialAuthState, AuthStateEntity } from './reducers/auth.reducer';
export { coursesReducer, coursesFeatureKey, initialCoursesState, CoursesStateEntity } from './reducers/courses.reducer';
// Selectors
export { selectRoleLoaded, selectRoleLoading, getAllRoles } from './selectors/roles.selector';
export { selectPermissionsLoaded, selectPermissionsLoading, getAllPermissions } from './selectors/permissions.selector';
export { currentUser, currentAuthToken, isLoggedIn, isLoggedOut, isUserLoaded } from './selectors/auth.selector';
export { selectAllCourses, selectCoursesLoaded, selectLoadingCourses } from './selectors/courses.selector';
