import { Component } from '@angular/core';
import { startupHeroComponent } from "../sections/hero/startup-hero/startup-hero.component";
import { StartupFormComponent } from "../../../forms/startup-form/startup-form.component";

@Component({
  selector: 'app-startup-page',
  standalone: true,
  imports: [startupHeroComponent, StartupFormComponent],
  templateUrl: './startup-page.component.html',
  styleUrl: './startup-page.component.css'
})
export class StartupPageComponent {

}
