import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AddUserComponent } from '../add-user/add-user.component';
import { SeeUserComponent } from '../see-user/see-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { ListUsersComponent } from '../users/list-users.component';

// Corriger les dossiers, ce n'est pas très logique.
// Dossier list-users, mais rien dedans alors qu'il y a un dossier users avec le component list-user
const routes: Routes = [
  {
    path: 'list',
    component: ListUsersComponent,
  },
  {
    path: 'users-management/users/see',
    component: SeeUserComponent,
  },
  {
    path: 'users-management/users/add',
    component: AddUserComponent,
  },
  {
    path: 'users-management/users/edit',
    component: UpdateUserComponent,
  },
];
@NgModule({
  declarations: [ListUsersComponent, SeeUserComponent, AddUserComponent, UpdateUserComponent],
  imports: [CommonModule, RouterModule.forChild(routes), NgxPermissionsModule.forChild()],
})
export class ListUsersModule {}
