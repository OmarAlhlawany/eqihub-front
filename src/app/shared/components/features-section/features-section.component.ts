import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  providers: [LanguageService],
  templateUrl: './features-section.component.html',
  styleUrl: './features-section.component.css'
})

export class FeaturesSectionComponent {
  features = [
    {
      icon: 'Portfolio.svg',
      titleKey: 'features.cards.0.title',
      descriptionKey: 'features.cards.0.description',
      active: true
    },
    {
      icon: 'Gem.svg',
      titleKey: 'features.cards.1.title',
      descriptionKey: 'features.cards.1.description',
      active: false
    },
    {
      icon: 'Network.svg',
      titleKey: 'features.cards.2.title',
      descriptionKey: 'features.cards.2.description',
      active: false
    }
  ];
}
