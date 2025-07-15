import { Component } from '@angular/core';
import { InvestorHeroComponent } from '../sections/hero/investor-hero/investor-hero.component';
import { InvestorFormComponent } from "../../../forms/investor-form/investor-form.component";
import { FeaturesSectionComponent } from "../../../shared/components/features-section/features-section.component";
import { MapStatsComponent } from "../../../shared/components/map-stats/map-stats.component";
import { OurProcessComponent } from "../../../shared/components/our-process/our-process.component";

@Component({
  selector: 'app-investor-page',
  standalone: true,
  imports: [InvestorHeroComponent, InvestorFormComponent, FeaturesSectionComponent, MapStatsComponent, OurProcessComponent],
  templateUrl: './investor-page.component.html',
  styleUrls: ['./investor-page.component.css']
})
export class InvestorPageComponent {}
