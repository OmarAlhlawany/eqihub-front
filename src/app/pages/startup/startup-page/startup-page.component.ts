import { Component } from '@angular/core';
import { startupHeroComponent } from "../sections/hero/startup-hero/startup-hero.component";
import { StartupFormComponent } from "../../../forms/startup-form/startup-form.component";
import { FeaturesSectionComponent } from "../../../shared/components/features-section/features-section.component";
import { MapStatsComponent } from "../../../shared/components/map-stats/map-stats.component";

@Component({
  selector: 'app-startup-page',
  standalone: true,
  imports: [startupHeroComponent, StartupFormComponent, FeaturesSectionComponent, MapStatsComponent],
  templateUrl: './startup-page.component.html',
  styleUrl: './startup-page.component.css'
})
export class StartupPageComponent {

}
