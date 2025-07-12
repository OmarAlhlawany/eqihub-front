import { Routes } from '@angular/router';
import { InvestorFormComponent } from './investor-form/investor-form.component';
import { StartupFormComponent } from './startup-form/startup-form.component';

export const routes: Routes = [
  { path: '', component: InvestorFormComponent }, // Default route
  { path: 'investor', component: InvestorFormComponent },
  { path: 'startup', component: StartupFormComponent },
  { path: '**', redirectTo: 'investor-form' } // Redirect unknown routes
];