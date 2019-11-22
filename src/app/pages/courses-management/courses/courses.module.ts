import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesEditComponent } from '../courses-edit/courses-edit.component';
import { CoursesAddComponent } from '../courses-add/courses-add.component';
import { RouterModule, Routes } from '@angular/router';
import { CoursesListComponent } from '../courses-list/courses-list.component';
import { CoursesComponent } from './courses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { AddVideoComponent } from '../add-video/add-video.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AddModuleFormationComponent } from '../add-module-formation/add-module-formation.component';
import { NgxMegaSimpleDragDropListModule } from 'ngx-mega-simple-drag-drop-list';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EditVideoComponent } from '../../partials/edit-video/edit-video.component';
import { EditQcmComponent } from '../../partials/edit-qcm/edit-qcm.component';
import { AddQcmComponent } from '../add-qcm/add-qcm.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    children: [
      { path: 'list', component: CoursesListComponent, data: { animation: 'animateState' } },
      {
        path: 'add',
        component: CoursesAddComponent,
        children: [
          { path: 'formation-module', component: AddModuleFormationComponent, data: { animation: 'animateState' } },
          { path: 'video', component: AddVideoComponent, data: { animation: 'animateState' } },
          { path: 'qcm', component: AddQcmComponent, data: { animation: 'animateState' } },
          { path: '**', redirectTo: 'formation-module' },
        ],
      },
      { path: 'edit/:action/:id', component: CoursesEditComponent, data: { animation: 'animateState' } },
    ],
  },
];
@NgModule({
  declarations: [
    CoursesComponent,
    CoursesEditComponent,
    CoursesAddComponent,
    CoursesListComponent,
    AddVideoComponent,
    AddModuleFormationComponent,
    EditVideoComponent,
    EditQcmComponent,
    AddQcmComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    AngularDualListBoxModule,
    NgxDropzoneModule,
    NgxMegaSimpleDragDropListModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgbAccordionModule,
  ],
})
export class CoursesModule {}
