import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,

  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) {}

  navigateToStartupForm() {
    this.router.navigate(['/startup-form']);
  }

  navigateToInvestorForm() {
    this.router.navigate(['/investor-form']);
  }
}