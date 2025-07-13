import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../../../services/language.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-investor-hero',
  standalone: true,
  templateUrl: './investor-hero.component.html',
  styleUrls: ['./investor-hero.component.css'],
  imports: [TranslateModule, CommonModule],
  providers: [LanguageService]

})
export class InvestorHeroComponent implements OnInit {
  keywords: string[] = ['investor.hero.keywords.Ai', 'investor.hero.keywords.Technology', 'investor.hero.keywords.Startup', 'investor.hero.keywords.Fintech'];
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
    this.keywords = keywordKeys.map(k => this.translate.instant(`investor.hero.keywords.${k}`));
    this.startTyping();
  }

  loadMarqueeMessages() {
    this.marqueeMessages = [
      { text: 'investor.marquee.1', icon: 'Gem.svg' },
      { text: 'investor.marquee.2', icon: 'Portfolio.svg' },
      { text: 'investor.marquee.3', icon: 'Network.svg' }
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
