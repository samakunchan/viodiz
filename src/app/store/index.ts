import { RolesStateEntity } from './reducers/roles.reducer';
import { PermStateEntity } from './reducers/permissions.reducer';

// Tout le store est ici
export interface AppState {
  roles: RolesStateEntity;
  permissions: PermStateEntity;
}
// Reducers
export { rolesReducer, roleFeatureKey } from './reducers/roles.reducer';
export { permissionsReducer, permissionFeatureKey } from './reducers/permissions.reducer';
// Selectors
export { selectRoleLoaded, selectRoleLoading, getAllRoles } from './selectors/roles.selector';
export { selectPermissionsLoaded, selectPermissionsLoading, getAllPermissions } from './selectors/permissions.selector';
