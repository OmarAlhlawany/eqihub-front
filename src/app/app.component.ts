import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InvestorFormComponent } from './investor-form/investor-form.component';
import { StartupFormComponent } from './startup-form/startup-form.component';
import { HeaderComponent } from './header/header.component';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    InvestorFormComponent,
    StartupFormComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'equi-hub';
  private languageService = inject(LanguageService);

  constructor() {
    // Set default language
    this.languageService.initLanguage();
    const currentLang = localStorage.getItem('lang') || 'en';
    document.documentElement.lang = currentLang;
  }
}
