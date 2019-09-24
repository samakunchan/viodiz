import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FrontLayoutRoutes } from './front-layout-routing.module';
import { LandingComponent } from '../../pages/landing/landing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SectionsModule } from '../../sections/sections.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(FrontLayoutRoutes),
    NgbModule,
    CommonModule,
    FormsModule,
    RouterModule,
    SectionsModule,
    TranslateModule,
  ],
})
export class FrontLayoutModule {}
