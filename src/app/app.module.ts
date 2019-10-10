import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { FrontLayoutComponent } from './layouts/front-layout/front-layout.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppFirebaseModule } from './app-firebase.module';
import { RolesService } from './core/services/roles.service';
import { PermissionsService } from './core/services/permissions.service';
import { EffectsModule } from '@ngrx/effects';
import { authReducer, permissionsReducer, rolesReducer } from './store';
import { RolesEffects } from './store/effects/roles.effects';
import { PermissionsEffects } from './store/effects/permissions.effects';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AuthEffects } from './store/effects/auth.effects';

@NgModule({
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, FrontLayoutComponent],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    LoadingBarModule,
    TranslateModule.forRoot(),
    EffectsModule.forRoot([RolesEffects, PermissionsEffects, AuthEffects]),
    NgxPermissionsModule.forRoot(),
    StoreModule.forRoot({ roles: rolesReducer, permissions: permissionsReducer, authUser: authReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    AppFirebaseModule,
    AngularFireStorageModule,
  ],
  providers: [RolesService, PermissionsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
