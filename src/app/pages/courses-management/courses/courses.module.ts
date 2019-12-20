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

import { AddQuizzComponent } from '../add-quizz/add-quizz.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from '@tinymce/tinymce-angular';
import { EditQuizzComponent } from '../edit-quizz/edit-quizz.component';
import { EditVideoComponent } from '../edit-video/edit-video.component';
import { CoursesService } from '../../../core/services/courses.service';
import { VideosService } from '../../../core/services/videos.service';
import { QuizzService } from '../../../core/services/quizz.service';

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
          { path: 'qcm', component: AddQuizzComponent, data: { animation: 'animateState' } },
          { path: '**', redirectTo: 'formation-module' },
        ],
      },
      {
        path: 'edit',
        component: CoursesEditComponent,
        children: [
          { path: 'video/:id', component: EditVideoComponent, data: { animation: 'animateState' } },
          { path: 'qcm/:id', component: EditQuizzComponent, data: { animation: 'animateState' } },
        ],
      },
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
    AddQuizzComponent,
    EditQuizzComponent,
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
    EditorModule,
  ],
  providers: [CoursesService, VideosService, QuizzService],
  // TODO mettre authService dans l'appModule provider et productService dans son futur provider productModule
})
export class CoursesModule {}
