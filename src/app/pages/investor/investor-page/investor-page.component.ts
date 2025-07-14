import { Component } from '@angular/core';
import { InvestorHeroComponent } from '../sections/hero/investor-hero/investor-hero.component';
import { InvestorFormComponent } from "../../../forms/investor-form/investor-form.component";
import { FeaturesSectionComponent } from "../../../shared/components/features-section/features-section.component";

@Component({
  selector: 'app-investor-page',
  standalone: true,
  imports: [InvestorHeroComponent, InvestorFormComponent, FeaturesSectionComponent],
  templateUrl: './investor-page.component.html',
  styleUrls: ['./investor-page.component.css']
})
export class InvestorPageComponent {}
