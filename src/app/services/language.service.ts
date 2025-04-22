import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translate = inject(TranslateService);
  currentLang: string = 'en'; 
  languageSwitched$ = new BehaviorSubject<boolean>(false); 

  constructor() {}

  initLanguage() {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.currentLang = savedLang;
    this.translate.setDefaultLang(savedLang);
    this.setDirection(savedLang);
  }

  switchLanguage(lang: string) {
    this.languageSwitched$.next(false); 

    this.translate.use(lang).subscribe(() => {
      this.currentLang = lang;
      localStorage.setItem('lang', lang);
      this.setDirection(lang);
      this.languageSwitched$.next(true); 
    });
  }

  get currentLanguage(): string {
    return this.translate.currentLang || this.currentLang;
  }

  private setDirection(language: string) {
    const body = document.body;

    if (language === 'ar') {
      body.setAttribute('dir', 'rtl');
      body.setAttribute('lang', 'ar');
      body.classList.add('arabic-font');
    } else {
      body.setAttribute('dir', 'ltr');
      body.setAttribute('lang', 'en');
      body.classList.remove('arabic-font'); 
    }
  }
}
