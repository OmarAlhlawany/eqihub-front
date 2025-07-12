import { Routes } from '@angular/router';
import { InvestorPageComponent } from './pages/investor/investor-page/investor-page.component';
import { StartupPageComponent } from './pages/startup/startup-page/startup-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/investor', pathMatch: 'full' },
  { path: 'investor', component: InvestorPageComponent },
  { path: 'startup', component: StartupPageComponent },
];
