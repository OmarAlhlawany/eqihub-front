import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translate = inject(TranslateService);

  constructor() {}

  initLanguage() {
    const defaultLang = 'en'; // Change this if needed
    this.translate.setDefaultLang(defaultLang);
    this.setDirection(defaultLang);
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.setDirection(lang);
  }

  private setDirection(language: string) {
    const body = document.body;

    if (language === 'ar') {
      body.setAttribute('dir', 'rtl');
      body.setAttribute('lang', 'ar');
    } else {
      body.setAttribute('dir', 'ltr');
      body.setAttribute('lang', 'en');
    }
  }
}
