import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './list-users.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AddUserComponent } from '../add-user/add-user.component';
import { SeeUserComponent } from '../see-user/see-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListUsersComponent,
  },
  {
    path: 'see',
    component: SeeUserComponent,
  },
  {
    path: 'add',
    component: AddUserComponent,
  },
  {
    path: 'edit',
    component: UpdateUserComponent,
  },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
];
@NgModule({
  declarations: [ListUsersComponent, SeeUserComponent, AddUserComponent, UpdateUserComponent],
  imports: [CommonModule, RouterModule.forChild(routes), NgxPermissionsModule.forChild()],
})
export class ListUsersModule {}
