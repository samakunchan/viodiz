import { RolesStateEntity } from './reducers/roles.reducer';
import { PermStateEntity } from './reducers/permissions.reducer';
import { AuthStateEntity } from './reducers/auth.reducer';

// Tout le store est ici
export interface AppState {
  roles: RolesStateEntity;
  permissions: PermStateEntity;
  authUser: AuthStateEntity;
}
// Reducers
export { rolesReducer, roleFeatureKey } from './reducers/roles.reducer';
export { permissionsReducer, permissionFeatureKey } from './reducers/permissions.reducer';
export { authReducer, authFeatureKey } from './reducers/auth.reducer';
// Selectors
export { selectRoleLoaded, selectRoleLoading, getAllRoles } from './selectors/roles.selector';
export { selectPermissionsLoaded, selectPermissionsLoading, getAllPermissions } from './selectors/permissions.selector';
export { currentUser, currentAuthToken, isLoggedIn, isLoggedOut, isUserLoaded } from './selectors/auth.selector';
