import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { CatalogComponent } from '../../pages/catalog/catalog.component';
import { FaqComponent } from '../../pages/faq/faq.component';
import { CommentsComponent } from '../../pages/comments/comments.component';
import { GetstartedComponent } from '../../pages/getstarted/getstarted.component';
import { FormationComponent } from '../../pages/formation/formation.component';
import { GroupesComponent } from '../../pages/groupes/groupes.component';
import { WebsiteeditionComponent } from '../../pages/websiteedition/websiteedition.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, data: { animation: 'toLeft' } },
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
      animation: 'toLeft1',
    },
  },
  { path: 'catalog', component: CatalogComponent, data: { animation: 'toLeft2' } },
  { path: 'icons', component: IconsComponent, data: { animation: 'toLeft3' } },
  { path: 'maps', component: MapsComponent, data: { animation: 'toLeft4' } },
  {
    path: 'products-management/products',
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['CONSTRUCTOR', 'ADMIN', 'MODERATOR'],
        except: ['GUEST'],
        redirectTo: 'admin/dashboard',
      },
      animation: 'toLeft5',
    },
    children: [
      {
        path: '',
        loadChildren: () => import('../../pages/products-management/products/products.module').then(m => m.ProductsModule),
      },
    ],
  },
  {
    path: 'courses-management/courses',
    canActivate: [NgxPermissionsGuard],
    // data: {
    //   permissions: {
    //     only: ['CONSTRUCTOR', 'ADMIN', 'MODERATOR'],
    //     except: ['GUEST'],
    //     redirectTo: 'admin/dashboard',
    //   },
    // },
    children: [
      {
        path: '',
        loadChildren: () => import('../../pages/courses-management/courses/courses.module').then(m => m.CoursesModule),
      },
    ],
  },
  {
    path: 'users-management/users',
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['CONSTRUCTOR', 'ADMIN', 'MODERATOR'],
        except: ['GUEST'],
        redirectTo: 'admin/dashboard',
      },
      animation: 'toLeft7',
    },
    children: [
      {
        path: '',
        loadChildren: () => import('../../pages/users-management/users/list-users.module').then(m => m.ListUsersModule),
      },
    ],
  },
  { path: 'faq', component: FaqComponent, data: { animation: 'toLeft8' } },
  { path: 'get-started', component: GetstartedComponent, data: { animation: 'toLeft9' } },
  { path: 'formation', component: FormationComponent, data: { animation: 'toLeft10' } },
  { path: 'groupes', component: GroupesComponent, data: { animation: 'toLeft11' } },
  { path: 'comments', component: CommentsComponent, data: { animation: 'toLeft12' } },
  { path: 'website-edit', component: WebsiteeditionComponent, data: { animation: 'toLeft13' } },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
