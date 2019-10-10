# NGX Loading bar

## Dependency

    #package.json

    "dependencies": {
        ...
        ...
        "@ngx-loading-bar/core": "^4.2.0",
        ...
        ...
    }

## AppModule

    #app.module.ts
    ...
    import { LoadingBarModule } from '@ngx-loading-bar/core';
    ...
    ...
    @NgModule({
      declarations: [...],
      imports: [
      ...
      LoadingBarModule
      ...
      ],
      providers: [],
      bootstrap: [AppComponent],
    })

## Component

    #app.component.ts ou header.component.ts

    ...
    ...
    import { LoadingBarService } from '@ngx-loading-bar/core';
    import { NavigationCancel, NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
    ...
    ...
    export class AppComponent {
      title = 'Viodiz';
      constructor(private loader: LoadingBarService, private router: Router) {
        // page progress bar percentage
        this.router.events.subscribe(event => {
          if (event instanceof NavigationStart) {
            // set page progress bar loading to start on NavigationStart event router
            this.loader.start();
          }
          if (event instanceof RouteConfigLoadStart) {
            this.loader.increment(35);
          }
          if (event instanceof RouteConfigLoadEnd) {
            this.loader.increment(75);
          }
          if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
            // set page progress bar loading to end on NavigationEnd event router
            this.loader.complete();
          }
        });
      }
    }

## View

    <ngb-progressbar *ngIf="(loader.progress$ | async) > 0" [value]="loader.progress$ | async" height="3px"></ngb-progressbar>
