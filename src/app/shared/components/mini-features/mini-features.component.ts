import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-mini-features',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './mini-features.component.html',
  styleUrls: ['./mini-features.component.css'],
})
export class MiniFeaturesComponent {
  @Input() pageType: 'investor' | 'startup' = 'investor';

  get sectionTitleKey() {
    return `miniFeatures.${this.pageType}.title`;
  }

  get features() {
    const baseKey = `miniFeatures.${this.pageType}`;
    return [
      {
        icon: 'rocket-2.svg',
        titleKey: `${baseKey}.feature1.title`,
        descKey: `${baseKey}.feature1.desc`,
      },
      {
        icon: 'People.svg',
        titleKey: `${baseKey}.feature2.title`,
        descKey: `${baseKey}.feature2.desc`,
      },
      {
        icon: 'verify-sign.svg',
        titleKey: `${baseKey}.feature3.title`,
        descKey: `${baseKey}.feature3.desc`,
      },
    ];
  }
}
