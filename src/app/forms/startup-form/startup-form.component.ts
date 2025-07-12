import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderService } from '../../services/header.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-startup-form',
  templateUrl: './startup-form.component.html',
  styleUrls: ['./startup-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
})
export class StartupFormComponent implements OnInit {
  startupForm: FormGroup;
  currentStep: number = 1; // Start from step 1
  dynamicData: any = {}; // To store dynamic tables data
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private headerService: HeaderService,
    private translate: TranslateService,
    private apiService: ApiService
  ) {
    this.startupForm = this.fb.group({
      // Step 1: Basic Information
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern('^[- +()0-9]+$')]],
      company: ['', [Validators.required, Validators.minLength(2)]],
      website: ['', [Validators.required, Validators.pattern(/^(http|https):\/\/[^ "]+$/)]],
      product_service_description: ['', [Validators.required, Validators.minLength(10)]],
      company_sector_id: ['', [Validators.required]],
      operational_phase_id: ['', [Validators.required]],
      problem_solved: ['', [Validators.required, Validators.minLength(20)]],

      // Step 2: Funding Details
      funding_amount_id: ['', [Validators.required]],
      funding_used: ['', [Validators.required, Validators.minLength(20)]],
      previous_funding_source_id: ['', [Validators.required]],
      target_market_id: ['', [Validators.required]],
      joint_investment: ['', [Validators.required]],
      existing_partners: ['', [Validators.required]],

      // Step 3: Financial Information
      monthly_revenue: ['', [Validators.required, Validators.min(0)]],
      is_profitable: ['', [Validators.required]],
      revenue_growth: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      revenue_goal: ['', [Validators.required, Validators.min(0)]],

      // Step 4: Exit Strategy
      have_debts: ['', [Validators.required]],
      debt_amount: ['', [Validators.min(0)]],
      break_even_point: ['', [Validators.required]],
      financial_goal: ['', [Validators.required, Validators.minLength(20)]],
      has_exit_strategy: ['', [Validators.required]],
      exit_strategy_details: [''],
    });

    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.headerService.setTitle(this.translate.instant('STARTUP_FORM.TITLE'));
    this.fetchDynamicData(); // Fetch dynamic data on component initialization
  }

  /**
   * Fetch dynamic data from the API
   */
  fetchDynamicData(): void {
    this.isLoading = true;
    this.apiService.getDynamicTables().subscribe({
      next: (data) => {
        this.dynamicData = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching dynamic data:', error);
        this.isLoading = false;
      },
    });
  }

  /**
   * Switch language
   */
  switchLanguage(language: string): void {
    this.translate.use(language);
  }

  /**
   * Move to the next step
   */
  nextStep(): void {
    if (this.currentStep < 6) {
      this.markCurrentStepControlsAsTouched();
      if (this.isStepValid(this.currentStep)) {
        this.currentStep++;
      }
    }
  }

/**
 * Move to the previous step
 */
prevStep(): void {
  if (this.currentStep === 1) {
    window.location.href = 'https://apply.equihub.co/';
  } else if (this.currentStep > 1) {
    this.currentStep--;
  }
}


  /**
   * Check if the current step is valid
   */
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
          this.startupForm.get('company_sector_id')?.valid &&
          this.startupForm.get('operational_phase_id')?.valid &&
          this.startupForm.get('problem_solved')?.valid
        );
      case 3:
        return !!(
          this.startupForm.get('funding_amount_id')?.valid &&
          this.startupForm.get('funding_used')?.valid &&
          this.startupForm.get('previous_funding_source_id')?.valid &&
          this.startupForm.get('target_market_id')?.valid
        );
      case 4:
        return !!(
          this.startupForm.get('joint_investment')?.valid &&
          this.startupForm.get('existing_partners')?.valid &&
          this.startupForm.get('monthly_revenue')?.valid &&
          this.startupForm.get('is_profitable')?.valid &&
          this.startupForm.get('revenue_growth')?.valid &&
          this.startupForm.get('revenue_goal')?.valid
        );
      case 5:
        return !!(
          this.startupForm.get('have_debts')?.valid &&
          (this.startupForm.get('have_debts')?.value === '2' || this.startupForm.get('debt_amount')?.valid) &&
          this.startupForm.get('break_even_point')?.valid &&
          this.startupForm.get('financial_goal')?.valid &&
          this.startupForm.get('has_exit_strategy')?.valid &&
          (this.startupForm.get('has_exit_strategy')?.value === '2' || this.startupForm.get('exit_strategy_details')?.valid)
        );
      default:
        return true;
    }
  }

  /**
   * Mark all controls in the current step as touched
   */
  markCurrentStepControlsAsTouched(): void {
    const stepControls = this.getControlsForStep(this.currentStep);
    stepControls.forEach((controlName) => {
      this.startupForm.get(controlName)?.markAsTouched();
    });
  }

  /**
   * Get form controls for the current step
   */
  getControlsForStep(step: number): string[] {
    switch (step) {
      case 1:
        return ['name', 'email', 'phone_number', 'company', 'website'];
      case 2:
        return ['product_service_description', 'company_sector_id', 'operational_phase_id', 'problem_solved'];
      case 3:
        return ['funding_amount_id', 'funding_used', 'previous_funding_source_id', 'target_market_id'];
      case 4:
        return ['joint_investment', 'existing_partners', 'monthly_revenue', 'is_profitable', 'revenue_growth', 'revenue_goal'];
      case 5:
        return ['have_debts', 'debt_amount', 'break_even_point', 'financial_goal', 'has_exit_strategy', 'exit_strategy_details'];
      default:
        return [];
    }
  }

  /**
   * Submit the form
   */
  onSubmit(): void {
    if (this.startupForm.valid) {
      const formData = this.startupForm.value;
      this.apiService.submitStartupForm(formData).subscribe({
        next: (response) => {
          console.log('Startup registered successfully:', response);
        },
        error: (error) => {
          console.error('Error submitting form:', error);
        },
      });
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
}
