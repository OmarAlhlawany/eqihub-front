import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentLanguage: string = 'en';
  currentRoute: string = '';
  private router = inject(Router);
  private translate = inject(TranslateService);
  private languageService = inject(LanguageService);

  ngOnInit() {
    this.currentLanguage = this.languageService.currentLanguage;
    
      this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.currentRoute = event.urlAfterRedirects;
    }
  });
    this.translate.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang;
    });
  }

  toggleLanguage() {
    const newLang = this.currentLanguage === 'en' ? 'ar' : 'en';
    this.languageService.switchLanguage(newLang);
  }

isActive(path: string): boolean {
  if (path === '/investor') {
    return this.currentRoute === '/' || this.currentRoute.includes('/investor');
  }

  return this.currentRoute.includes(path);
}


}
