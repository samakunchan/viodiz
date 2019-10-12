import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ListUsersComponent } from '../../pages/users-management/list-users/list-users.component';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { SeeUserComponent } from '../../pages/users-management/see-user/see-user.component';
import { AddUserComponent } from '../../pages/users-management/add-user/add-user.component';
import { UpdateUserComponent } from '../../pages/users-management/update-user/update-user.component';
import { FirstLetterPipe } from '../../core/pipe/first-letter.pipe';
import { UsersService } from '../../core/services/users.service';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    TranslateModule,
    NgxPermissionsModule.forChild(),
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    ListUsersComponent,
    SeeUserComponent,
    AddUserComponent,
    UpdateUserComponent,
    FirstLetterPipe
  ],
  providers: [NgxPermissionsService, UsersService],
  exports: [FirstLetterPipe]
})
export class AdminLayoutModule {}
