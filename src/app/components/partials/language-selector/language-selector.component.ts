// Angular
import { Component, HostBinding, OnInit, Input } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
// RxJS
import { filter } from 'rxjs/operators';
import { TranslationService } from '../../../services/translation.service';
// Translate


interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  alt: string;
}

@Component({
  selector: 'vio-language-selector',
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
