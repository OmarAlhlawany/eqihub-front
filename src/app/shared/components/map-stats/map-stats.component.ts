import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map-stats',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  providers: [LanguageService],
  templateUrl: './map-stats.component.html',
  styleUrl: './map-stats.component.css'
})
export class MapStatsComponent implements OnInit, AfterViewInit {
  investmentCount: number = 0;
  startupCount: number = 0;
  capitalCount: number = 0;
  evolutionCount: number = 0;

  private observerStarted = false;

  @ViewChild('counterSection', { static: false }) counterSection!: ElementRef;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.counterSection) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !this.observerStarted) {
              this.observerStarted = true;
              this.startCounter('investmentCount', 500, 5000);
              this.startCounter('startupCount', 8000, 4200);
              this.startCounter('capitalCount', 2.3, 8000, true);
              this.startCounter('evolutionCount', 42, 4000);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(this.counterSection.nativeElement);
    }
  }

  startCounter(prop: keyof MapStatsComponent, end: number, duration: number, isFloat = false) {
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    let count = 0;

    const interval = setInterval(() => {
      count++;
      if (count >= steps) {
        (this[prop] as any) = end;
        clearInterval(interval);
      } else {
        (this[prop] as any) = isFloat
          ? parseFloat((current += increment).toFixed(1))
          : Math.floor((current += increment));
      }
      this.cdr.detectChanges();
    }, duration / steps);
  }
}
