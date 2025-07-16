import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-process-highlights',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './process-highlights.component.html',
  styleUrls: ['./process-highlights.component.css'],
})
export class ProcessHighlightsComponent implements OnInit {
  @Input() pageType: 'investor' | 'startup' = 'investor';

  currentIndex = 0;
  intervalId: any;

  steps = {
    investor: [
      { key: '01', img: 'assets/img-1.jpg' },
      { key: '02', img: 'assets/img-2.jpg' },
      { key: '03', img: 'assets/img-3.jpg' },
      { key: '04', img: 'assets/img-4.jpg' },
    ],
    startup: [
      { key: '01s', img: 'assets/img-1.jpg' },
      { key: '02s', img: 'assets/img-2.jpg' },
      { key: '03s', img: 'assets/img-4.jpg' },
    ],
  };

  get activeSteps() {
    return this.steps[this.pageType];
  }

  ngOnInit() {
    this.startAutoScroll();
  }

  startAutoScroll() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.activeSteps.length;
    }, 5000);
  }

  setStep(index: number) {
    this.currentIndex = index;
    clearInterval(this.intervalId);
    this.startAutoScroll();
  }
}
