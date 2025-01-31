import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HeaderService } from '../services/header.service';
import { LanguageService } from '../services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = ''; // Will be dynamically set
  currentLanguage: string = 'en'; // Default language

  private languageService = inject(LanguageService);
  private translate = inject(TranslateService);
  private router = inject(Router);

  constructor(private headerService: HeaderService) {}

  ngOnInit() {
    // Set the initial language
    this.currentLanguage = this.translate.currentLang || 'en';

    // Update title based on the active route
    this.router.events.subscribe(() => {
      this.updateTitleBasedOnRoute();
    });

    // Update title when language changes
    this.translate.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang; // Update current language
      this.updateTitleBasedOnRoute();
    });

    // Allow external updates via HeaderService
    this.headerService.title$.subscribe((newTitle) => {
      this.title = newTitle;
    });

    // Set initial title
    this.updateTitleBasedOnRoute();
  }

  // Toggle between English and Arabic
  toggleLanguage() {
    const newLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
    this.languageService.switchLanguage(newLanguage);
  }

  private updateTitleBasedOnRoute() {
    const url = this.router.url;

    if (url.includes('investor-form')) {
      this.translate.get('HEADER.TITLE_INVESTOR').subscribe((res) => {
        this.title = res;
      });
    } else if (url.includes('startup-form')) {
      this.translate.get('HEADER.TITLE_STARTUP').subscribe((res) => {
        this.title = res;
      });
    } else {
      this.translate.get('HEADER.TITLE_DEFAULT').subscribe((res) => {
        this.title = res;
      });
    }
  }
}