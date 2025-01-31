import { Routes } from '@angular/router';
import { InvestorFormComponent } from './investor-form/investor-form.component';
import { StartupFormComponent } from './startup-form/startup-form.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'investor-form', component: InvestorFormComponent },
  { path: 'startup-form', component: StartupFormComponent },
  { path: '**', redirectTo: '' } // Redirect unknown routes
];