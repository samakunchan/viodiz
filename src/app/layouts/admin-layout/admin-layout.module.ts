import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { UsersService } from '../../core/services/users.service';
import { FormProfileComponent } from '../../pages/partials/form-profile/form-profile.component';
import { CardCourseComponent } from '../../pages/partials/card-course/card-course.component';
import { ListUsersModule } from '../../pages/users-management/list-users/list-users.module';
import { CatalogComponent } from '../../pages/catalog/catalog.component';
import { ProductsComponent } from '../../pages/products/products.component';
import { CoursesComponent } from '../../pages/courses/courses.component';
import { FaqComponent } from '../../pages/faq/faq.component';
import { CommentsComponent } from '../../pages/comments/comments.component';
import { FormationComponent } from '../../pages/formation/formation.component';
import { GroupesComponent } from '../../pages/groupes/groupes.component';
import { WebsiteeditionComponent } from '../../pages/websiteedition/websiteedition.component';
import { GetstartedComponent } from '../../pages/getstarted/getstarted.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    TranslateModule,
    ReactiveFormsModule,
    ListUsersModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    FormProfileComponent,
    CardCourseComponent,
    CatalogComponent,
    ProductsComponent,
    CoursesComponent,
    FaqComponent,
    CommentsComponent,
    FormationComponent,
    GroupesComponent,
    WebsiteeditionComponent,
    GetstartedComponent,
  ],
  providers: [NgxPermissionsService, UsersService],
  exports: [],
})
export class AdminLayoutModule {}
