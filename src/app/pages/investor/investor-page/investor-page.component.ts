import { Component } from '@angular/core';
import { InvestorHeroComponent } from '../sections/hero/investor-hero/investor-hero.component';
import { InvestorFormComponent } from "../../../forms/investor-form/investor-form.component";

@Component({
  selector: 'app-investor-page',
  standalone: true,
  imports: [InvestorHeroComponent, InvestorFormComponent],
  templateUrl: './investor-page.component.html',
  styleUrls: ['./investor-page.component.css']
})
export class InvestorPageComponent {}
