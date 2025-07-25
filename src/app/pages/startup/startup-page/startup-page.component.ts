import { Component } from '@angular/core';
import { startupHeroComponent } from "../sections/hero/startup-hero/startup-hero.component";
import { StartupFormComponent } from "../../../forms/startup-form/startup-form.component";
import { FeaturesSectionComponent } from "../../../shared/components/features-section/features-section.component";
import { MapStatsComponent } from "../../../shared/components/map-stats/map-stats.component";
import { OurProcessComponent } from "../../../shared/components/our-process/our-process.component";
import { MiniFeaturesComponent } from "../../../shared/components/mini-features/mini-features.component";
import { FaqComponent } from "../../../shared/components/faq/faq.component";
import { CtaComponent } from "../../../shared/components/cta/cta.component";
import { VideosSectionComponent } from "../../../shared/components/videos-section/videos-section.component";
import { ProcessHighlightsComponent } from "../../../shared/components/process-highlights/process-highlights.component";

@Component({
  selector: 'app-startup-page',
  standalone: true,
  imports: [startupHeroComponent, StartupFormComponent, FeaturesSectionComponent, MapStatsComponent, OurProcessComponent, MiniFeaturesComponent, FaqComponent, CtaComponent, VideosSectionComponent, ProcessHighlightsComponent],
  templateUrl: './startup-page.component.html',
  styleUrl: './startup-page.component.css'
})
export class StartupPageComponent {

}
