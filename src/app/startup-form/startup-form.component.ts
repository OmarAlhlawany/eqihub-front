import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderService } from '../services/header.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-startup-form',
  templateUrl: './startup-form.component.html',
  styleUrls: ['./startup-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
})
export class StartupFormComponent implements OnInit {
  startupForm: FormGroup;
  currentStep: number = 3; // Start from step 1

  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private headerService: HeaderService,
    private translate: TranslateService,
    private apiService: ApiService
  ) {
    this.startupForm = this.fb.group({
      // Step 1: Basic Information
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern('^[- +()0-9]+$')]],
      company: ['', [Validators.required, Validators.minLength(2)]],
      website: ['', [Validators.required, Validators.pattern(/^(http|https):\/\/[^ "]+$/)]],
      product_service_description: ['', [Validators.required, Validators.minLength(10)]],
      company_sector: ['', [Validators.required]],
      operational_phase: ['', [Validators.required]],
      problem_solved: ['', [Validators.required, Validators.minLength(20)]],

      // Step 2: Funding Details
      funding_amount: ['', [Validators.required]],
      funding_used: ['', [Validators.required, Validators.minLength(20)]],
      previous_funding_source: ['', [Validators.required]],
      target_market: ['', [Validators.required]],
      joint_investment: ['', [Validators.required]],
      existing_partners: ['', [Validators.required]],

      // Step 3: Financial Information
      monthlyRevenue: ['', [Validators.required, Validators.min(0)]],
      is_profitable: ['', [Validators.required]],
      profitPercentage: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      revenue_goal: ['', [Validators.required, Validators.min(0)]],

      // Step 4: Exit Strategy
      have_debts: ['', [Validators.required]],
      currentDebtSize: [''],
      break_even_point: ['', [Validators.required]],
      financial_goal: ['', [Validators.required, Validators.minLength(20)]],
      has_exit_strategy: ['', [Validators.required]],
      exitStrategyDetails: [''],

      // Step 5: Financial Goals (fields already included in Step 4)
    });

    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.headerService.setTitle(this.translate.instant('STARTUP_FORM.TITLE'));
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  goToStep(step: number) {
    this.currentStep = step;
  }

  isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        return !!(
          this.startupForm.get('name')?.valid &&
          this.startupForm.get('email')?.valid &&
          this.startupForm.get('phone_number')?.valid &&
          this.startupForm.get('company')?.valid &&
          this.startupForm.get('website')?.valid
        );
      case 2:
        return !!(
          this.startupForm.get('product_service_description')?.valid &&
          this.startupForm.get('company_sector')?.valid &&
          this.startupForm.get('operational_phase')?.valid &&
          this.startupForm.get('problem_solved')?.valid
        );
      case 3:
        return !!(
          this.startupForm.get('funding_amount')?.valid &&
          this.startupForm.get('funding_used')?.valid &&
          this.startupForm.get('previous_funding_source')?.valid &&
          this.startupForm.get('target_market')?.valid 
        );
      case 4:
        return !!(
          this.startupForm.get('joint_investment')?.valid &&
          this.startupForm.get('existing_partners')?.valid&&
          this.startupForm.get('monthlyRevenue')?.valid &&
          this.startupForm.get('is_profitable')?.valid &&
          this.startupForm.get('profitPercentage')?.valid &&
          this.startupForm.get('revenue_goal')?.valid
        );
      case 5:
        return !!(
          this.startupForm.get('have_debts')?.valid &&
          (this.startupForm.get('have_debts')?.value === 'no' || this.startupForm.get('currentDebtSize')?.valid) &&
          this.startupForm.get('break_even_point')?.valid &&
          this.startupForm.get('financial_goal')?.valid &&
          this.startupForm.get('has_exit_strategy')?.valid &&
          (this.startupForm.get('has_exit_strategy')?.value === 'no' || this.startupForm.get('exitStrategyDetails')?.valid)
        );
      default:
        return true;
    }
  }


  nextStep() {
    if (this.currentStep < 6) {
      // Mark all form controls as touched to show validation errors
      this.markCurrentStepControlsAsTouched();

      // Check if the current step is valid
      if (this.isStepValid(this.currentStep)) {
        this.currentStep++; // Move to the next step
      }
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  markCurrentStepControlsAsTouched() {
    const stepControls = this.getControlsForStep(this.currentStep);
    stepControls.forEach((controlName) => {
      this.startupForm.get(controlName)?.markAsTouched();
    });
  }

  getControlsForStep(step: number): string[] {
    switch (step) {
      case 1:
        return ['name', 'email', 'phone_number', 'company', 'website'];
      case 2:
        return ['product_service_description', 'company_sector', 'operational_phase', 'problem_solved'];
      case 3:
        return ['funding_amount', 'funding_used', 'previous_funding_source', 'target_market'];
      case 4:
        return ['joint_investment', 'existing_partners', 'monthlyRevenue', 'is_profitable', 'profitPercentage', 'revenue_goal'];
      case 5:
        return ['have_debts', 'currentDebtSize', 'break_even_point', 'financial_goal', 'has_exit_strategy', 'exitStrategyDetails'];
      default:
        return [];
    }
  }

  logInvalidControls() {
    Object.keys(this.startupForm.controls).forEach((controlName) => {
      const control = this.startupForm.get(controlName);
      if (control && control.invalid) {
        console.log(`Invalid Control: ${controlName}`);
        console.log('Errors:', control.errors); // Log the validation errors
      }
    });
  }
  onSubmit() {
    if (this.startupForm.valid) {
      const formData = this.startupForm.value;
      console.log('Form Submitted!', formData);

      // Send the form data to the API
      this.apiService.submitStartupForm(formData).subscribe({
        next: (response) => {
          console.log('Response:', response);
          // Handle the response (e.g., show a success message)
        },
        error: (error) => {
          console.error('Error:', error);
          // Handle the error (e.g., show an error message)
        }
      });
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }

}
/*

nextStep() {
    if (this.currentStep < 6) {
      // Mark all form controls as touched to show validation errors
      this.markCurrentStepControlsAsTouched();

      // Check if the current step is valid
      if (this.isStepValid(this.currentStep)) {
        this.currentStep++; // Move to the next step
      }
    }
  }

  */


/*

nextStep() {
    if (this.currentStep < 5) {
        this.currentStep++; // Move to the next step
      }
  }

*/
