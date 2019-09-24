import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarFrontComponent } from './navbarfront/navbar-front.component';
import { FooterFrontComponent } from './footerfront/footer-front.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectorComponent } from './partials/language-selector/language-selector.component';
import { NgxPermissionsModule } from 'ngx-permissions';
// import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, TranslateModule, NgxPermissionsModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, NavbarFrontComponent, FooterFrontComponent, LanguageSelectorComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, NavbarFrontComponent, FooterFrontComponent],
})
export class ComponentsModule {}
