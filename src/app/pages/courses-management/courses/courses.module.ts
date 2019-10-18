import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesEditComponent } from '../courses-edit/courses-edit.component';
import { CoursesAddComponent } from '../courses-add/courses-add.component';
import { RouterModule, Routes } from '@angular/router';
import { CoursesListComponent } from '../courses-list/courses-list.component';
import { CoursesComponent } from './courses.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    children: [
      { path: 'list', component: CoursesListComponent, data: { animation: 'list' } },
      { path: 'add', component: CoursesAddComponent, data: { animation: 'add' } },
      { path: 'edit', component: CoursesEditComponent, data: { animation: 'edit' } },
    ],
  },
];
@NgModule({
  declarations: [CoursesComponent, CoursesEditComponent, CoursesAddComponent, CoursesListComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class CoursesModule {}
