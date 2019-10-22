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
import { ListUsersModule } from '../../pages/users-management/users/list-users.module';
import { FaqComponent } from '../../pages/faq/faq.component';
import { CommentsComponent } from '../../pages/comments/comments.component';
import { FormationComponent } from '../../pages/formation/formation.component';
import { GroupesComponent } from '../../pages/groupes/groupes.component';
import { WebsiteeditionComponent } from '../../pages/websiteedition/websiteedition.component';
import { GetstartedComponent } from '../../pages/getstarted/getstarted.component';
import { CoursesModule } from '../../pages/courses-management/courses/courses.module';
import { ProductsModule } from '../../pages/products-management/products/products.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from '../../store/effects/courses.effects';
import { coursesFeatureKey, coursesReducer } from '../../store/reducers/courses.reducer';
import { productsFeatureKey, productReducer } from '../../store/reducers/products.reducer';
import { ProductsEffects } from '../../store/effects/products.effects';
import { CatalogModule } from '../../pages/catalog-management/catalog/catalog.module';

@NgModule({
  imports: [
    RouterModule.forChild(AdminLayoutRoutes),
    StoreModule.forFeature(coursesFeatureKey, coursesReducer),
    StoreModule.forFeature(productsFeatureKey, productReducer),
    EffectsModule.forFeature([CoursesEffects, ProductsEffects]),
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    TranslateModule,
    ReactiveFormsModule,
    ListUsersModule,
    CoursesModule,
    ProductsModule,
    CatalogModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    FormProfileComponent,
    CardCourseComponent,
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
