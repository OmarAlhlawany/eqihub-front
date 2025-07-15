import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.css'],
})
export class CtaComponent {
  @Input() pageType: 'investor' | 'startup' = 'investor';
  constructor(private route: ActivatedRoute) {}

ngOnInit(): void {
  this.route.fragment.subscribe(fragment => {
    if (fragment) {
      // نعمل Scroll يدوي
      const element = document.getElementById(fragment);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      }
    }
  });
}
}




