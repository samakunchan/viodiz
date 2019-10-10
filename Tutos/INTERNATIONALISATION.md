# Internationalisation

## Dependency

    npm install @ngx-translate/core @ngx-translate/http-loader rxjs --save
    ou
    npm install @ngx-translate/core --save
    npm install @ngx-translate/http-loader rxjs --save

## Translate file

Créer un fichier `.ts` (ex: fr.ts) et exporter une variable locale comme ci dessous:

    # /core/i18n/en.ts
    NB: i18n est l'abréviation de 'internationalisation'. 18 est le nombre de lettre entre le 'i' et le 'n'.

    export const locale = {
      lang: 'en',
      data: {
        FRONT: {
          AUTH: {
            START: 'Get started'
          },
          HOME: {}
        }
      }
    };

## AppModule

    # /appModule.ts

    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';

    import { AppComponent } from './app.component';

    // import ngx-translate and the http loader
    import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
    import {TranslateHttpLoader} from '@ngx-translate/http-loader';
    import {HttpClient, HttpClientModule} from '@angular/common/http';

    @NgModule({
        declarations: [
            AppComponent
        ],
        imports: [
            BrowserModule,
            ...
            ...
            TranslateModule.forRoot() <= juste ça ici
            ...
            ...
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
    export class AppModule { }

NB sur les modules:

- Sans le lazy loading, on peut passer à la suite.
- Avec le lazy loading, il faut importer le `TranslateModule` dans la sous module concerner par la traduction.

## Service

Créer un service Translation qui utilise le service Translate de ngx. On y créé des méthodes utiles pour plus tard.

    #/services/tranlation.service.ts

    import { Injectable } from '@angular/core';
    import { TranslateService } from '@ngx-translate/core';

    export interface Locale {
      lang: string;
      // tslint:disable-next-line:ban-types
      data: Object;
    }

    @Injectable({
      providedIn: 'root'
    })
    export class TranslationService {
      // Private properties
      private langIds: any = [];

      /**
       * Service Constructor
       *
       * @param translate: TranslateService
       */
      constructor(private translate: TranslateService) {
        // add new langIds to the list
        this.translate.addLangs(['en']);

        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang('en');
      }

      /**
       * Load Translation
       *
       * @param args: Locale[]
       */
      loadTranslations(...args: Locale[]): void {
        const locales = [...args];

        locales.forEach(locale => {
          // use setTranslation() with the third argument set to true
          // to append translations instead of replacing them
          this.translate.setTranslation(locale.lang, locale.data, true);

          this.langIds.push(locale.lang);
        });

        // add new languages to the list
        this.translate.addLangs(this.langIds);
      }

      /**
       * Setup language
       *
       * @param lang: any
       */
      setLanguage(lang) {
        if (lang) {
          this.translate.use(this.translate.getDefaultLang());
          this.translate.use(lang);
          localStorage.setItem('language', lang);
        }
      }

      /**
       * Returns selected language
       */
      getSelectedLanguage(): any {
        return localStorage.getItem('language') || this.translate.getDefaultLang();
      }
    }

## Component

Dans l'AppComponent:

    # /appComponent.ts

    import { Component } from '@angular/core';
    import { LoadingBarService } from '@ngx-loading-bar/core';
    import { NavigationCancel, NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';

    import { enLang, frLang } from './core/'; <= Rassemblement de toute les variables locale dans un fichier /core/index.ts
    import { TranslationService } from './services/translation.service'; <= ici

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.scss'],
    })
    export class AppComponent {
      ...
      ...
      constructor(
      ...
      ...
      private translationService: TranslationService <= ici
      ) {

        this.translationService.loadTranslations(enLang, frLang); <= ici
        ...
        ...
      }
    }

# Selector languages

## Module

1- Importer le module le TranslateModule et le LanguageSelectorComponent (voir ci-après).

    ...
    ...
    import { TranslateModule } from '@ngx-translate/core';
    import { LanguageSelectorComponent } from './partials/language-selector/language-selector.component';

    @NgModule({
      imports: [
        ...
        ...
        TranslateModule,
        ...
        ...
      ],
      declarations: [
        ...
        ...
        LanguageSelectorComponent
        ...
        ...
      ],
      exports: [...],
    })

## Component

2- Créer le `LanguageSelectorComponent` ou vous le voulez. Perso, je l'ai mis pret de la navbar component.

    // Angular
    import { Component, HostBinding, OnInit, Input } from '@angular/core';
    import { NavigationStart, Router } from '@angular/router';
    // RxJS
    import { filter } from 'rxjs/operators';
    // Translate
    import { TranslationService } from '../../../services/translation.service';

    interface LanguageFlag {
      lang: string;
      name: string;
      flag: string;
      alt: string;
    }

    @Component({
      selector: 'app-language-selector',
      templateUrl: './language-selector.component.html',
    })
    export class LanguageSelectorComponent implements OnInit {

      language: LanguageFlag;
      languages: LanguageFlag[] = [
        {
          lang: 'en',
          name: 'English',
          alt: 'English language icon',
          flag: 'assets/img/flags/012-uk.svg',
        },
        {
          lang: 'fr',
          name: 'Français',
          alt: 'Icone Langage français',
          flag: 'assets/img/flags/019-france.svg',
        },
      ];

      /**
       * Component constructor
       *
       * @param translationService: TranslationService
       * @param router: Router
       */
      constructor(private translationService: TranslationService, private router: Router) {}

      /**
       * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
       */

      /**
       * On init
       */
      ngOnInit() {
        this.setSelectedLanguage();
        this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(event => {
          this.setSelectedLanguage();
        });
      }

      /**
       * Set language
       *
       * @param lang: any
       */
      setLanguage(lang) {
        this.languages.forEach((language: LanguageFlag) => {
          if (language.lang === lang) {
            this.language = language;
          } else {
          }
        });
        this.translationService.setLanguage(lang);
      }

      /**
       * Set selected language
       */
      setSelectedLanguage(): any {
        this.setLanguage(this.translationService.getSelectedLanguage());
      }
    }

## HTML

    # ./language-selector.component.html

    <li ngbDropdown [placement]="'bottom-right'" class="nav-item">
      <a class="nav-link pr-0" role="button" ngbDropdownToggle>
        <div class="media align-items-center">
          <span class="avatar avatar-sm rounded">
             <img class="" src="{{ language?.flag }}" alt="{{ language.alt }}" />
          </span>
        </div>
      </a>
      <div
        ngbDropdownMenu
        aria-labelledby="dropdownBasic1"
        class="dropdown-menu-arrow dropdown-menu-right"
      >
        <ng-container *ngFor="let language of languages">
          <a href="javascript:;" (click)="setLanguage(language.lang)" class="dropdown-item">
            <img class="flag" src="{{ language.flag }}" alt="{{ language.alt }}"/>
            <span class="kt-nav__link-text">{{ language.name }}</span>
          </a>
        </ng-container>
      </div>
    </li>

## CSS

Adapter le css des icônes si besoin.

    .flag{
    width: 30px;
    padding-right: 10px;
    }

## Final

Utiliser la balise du sélecteur `<app-language-selector></app-language-selector>` la ou vous avez besoin.
Ici c'est dans la navbar.

    <nav class="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
      <div class="container-fluid">
        <a
          class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
          routerLinkActive="active"
          [routerLink]="['dashboard']"
        >Dashboard</a>
        ...
        ...
        <ul class="navbar-nav align-items-center d-none d-md-flex">
          <app-language-selector></app-language-selector>
           ...
           ...
        </ul>
      </div>
    </nav>
