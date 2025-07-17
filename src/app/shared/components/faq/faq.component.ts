import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  imports: [CommonModule, TranslateModule],
  standalone: true,
})
export class FaqComponent {
  @Input() pageType: 'investor' | 'startup' = 'investor';

activeIndex: number | null = 1; // بدل null

  toggle(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
