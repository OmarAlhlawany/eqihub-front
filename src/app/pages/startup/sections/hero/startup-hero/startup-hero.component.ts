import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../../../services/language.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-startup-hero',
  standalone: true,
  templateUrl: './startup-hero.component.html',
  styleUrls: ['./startup-hero.component.css'],
  imports: [TranslateModule, CommonModule],
  providers: [LanguageService]

})
export class startupHeroComponent implements OnInit {
  keywords: string[] = ['startup.hero.keywords.Ai', 'startup.hero.keywords.Technology', 'startup.hero.keywords.Startup', 'startup.hero.keywords.Fintech'];
  displayedText = '';
  currentIndex = 0;
  charIndex = 0;
  typingSpeed = 100;
  marqueeMessages: { text: string, icon: string }[] = [];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadTranslatedKeywords();
    this.loadMarqueeMessages();
  }

  loadTranslatedKeywords() {
    const keywordKeys = ['Ai', 'Technology', 'Startup', 'Fintech'];
    this.keywords = keywordKeys.map(k => this.translate.instant(`startup.hero.keywords.${k}`));
    this.startTyping();
  }

  loadMarqueeMessages() {
    this.marqueeMessages = [
      { text: 'startup.marquee.1', icon: 'Gem.svg' },
      { text: 'startup.marquee.2', icon: 'Portfolio.svg' },
      { text: 'startup.marquee.3', icon: 'Network.svg' }
    ];
  }

startTyping() {
  const currentKey = this.keywords[this.currentIndex];
  const currentWord = this.translate.instant(currentKey);
  if (this.charIndex < currentWord.length) {
    this.displayedText += currentWord.charAt(this.charIndex);
    this.charIndex++;
    setTimeout(() => this.startTyping(), this.typingSpeed);
  } else {
    setTimeout(() => {
      this.displayedText = '';
      this.charIndex = 0;
      this.currentIndex = (this.currentIndex + 1) % this.keywords.length;
      this.startTyping();
    }, 1500);
  }
}
}
