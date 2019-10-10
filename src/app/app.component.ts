import { Component} from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NavigationCancel, NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { enLang, frLang } from './core/';
import { TranslationService } from './core/services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Viodiz';
  logo = 'assets/img/brand/logo-viodiz.png';

  /**
   * App constructor
   * @param loader: LoadingBarService
   * @param router: Router
   * @param translationService: translationService
   */
  constructor(
    private loader: LoadingBarService,
    private router: Router,
    private translationService: TranslationService,
  ) {
    // Chargement de la traduction
    this.translationService.loadTranslations(enLang, frLang);

    // Barre de progression en %
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // start la barre de progression sur NavigationStart de l'event router
        this.loader.start();
      }
      if (event instanceof RouteConfigLoadStart) {
        this.loader.increment(35);
      }
      if (event instanceof RouteConfigLoadEnd) {
        this.loader.increment(75);
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        // termine la barre de progression sur NavigationEnd de l'event router
        this.loader.complete();
      }
    });
  }

}
