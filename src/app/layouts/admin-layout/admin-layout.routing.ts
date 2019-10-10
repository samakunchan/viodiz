import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { ListUsersComponent } from '../../pages/users-management/list-users/list-users.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  {
    path: 'tables',
    component: TablesComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['CONSTRUCTOR', 'ADMIN', 'MODERATOR'],
        except: ['GUEST'],
        redirectTo: 'admin/dashboard',
      },
    },
  },
  { path: 'icons', component: IconsComponent },
  { path: 'maps', component: MapsComponent },
  {
    path: 'users-management/list-users',
    component: ListUsersComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['CONSTRUCTOR', 'ADMIN'],
        except: ['GUEST'],
        redirectTo: 'admin/dashboard',
      },
    },
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
