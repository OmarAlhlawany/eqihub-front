import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-our-process',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './our-process.component.html',
  styleUrl: './our-process.component.css'
})
export class OurProcessComponent implements OnInit {
    @Input() pageType: 'investor' | 'startup' = 'investor';

  currentPage: 'investor' | 'startup' = 'investor';

  ngOnInit(): void {
    const path = location.pathname.toLowerCase();
    this.currentPage = path.includes('startup') ? 'startup' : 'investor';
  }

  get steps() {
    const commonIcons = ['form.svg', 'verified.svg', 'rocket.svg'];

    if (this.currentPage === 'investor') {
      return [
        {
          icon: commonIcons[0],
          titleKey: 'ourProcess.investor.step1.title',
          descKey: 'ourProcess.investor.step1.desc'
        },
        {
          icon: commonIcons[1],
          titleKey: 'ourProcess.investor.step2.title',
          descKey: 'ourProcess.investor.step2.desc'
        },
        {
          icon: commonIcons[2],
          titleKey: 'ourProcess.investor.step3.title',
          descKey: 'ourProcess.investor.step3.desc'
        }
      ];
    } else {
      return [
        {
          icon: commonIcons[0],
          titleKey: 'ourProcess.startup.step1.title',
          descKey: 'ourProcess.startup.step1.desc'
        },
        {
          icon: commonIcons[1],
          titleKey: 'ourProcess.startup.step2.title',
          descKey: 'ourProcess.startup.step2.desc'
        },
        {
          icon: commonIcons[2],
          titleKey: 'ourProcess.startup.step3.title',
          descKey: 'ourProcess.startup.step3.desc'
        }
      ];
    }
  }
}
