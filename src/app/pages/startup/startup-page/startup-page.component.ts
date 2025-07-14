import { Component } from '@angular/core';
import { startupHeroComponent } from "../sections/hero/startup-hero/startup-hero.component";
import { StartupFormComponent } from "../../../forms/startup-form/startup-form.component";
import { FeaturesSectionComponent } from "../../../shared/components/features-section/features-section.component";

@Component({
  selector: 'app-startup-page',
  standalone: true,
  imports: [startupHeroComponent, StartupFormComponent, FeaturesSectionComponent],
  templateUrl: './startup-page.component.html',
  styleUrl: './startup-page.component.css'
})
export class StartupPageComponent {

}
