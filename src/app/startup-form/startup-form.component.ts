import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderService } from '../services/header.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-startup-form',
  templateUrl: './startup-form.component.html',
  styleUrls: ['./startup-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
})
export class StartupFormComponent implements OnInit {
  startupForm: FormGroup;
  currentStep: number = 1;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private headerService: HeaderService,
    private translate: TranslateService
  ) {
    this.startupForm = this.fb.group({
      // Step 1: Basic Information
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      companyName: ['', [Validators.required, Validators.minLength(2)]],
      website: ['', [Validators.required, Validators.pattern(/^(http|https):\/\/[^ "]+$/)]],
      productService: ['', [Validators.required, Validators.minLength(10)]],
      sector: ['', [Validators.required]],
      operationalStage: ['', [Validators.required]],
      problemSolved: ['', [Validators.required, Validators.minLength(20)]],

      // Step 2: Funding Details
      fundingAmount: ['', [Validators.required, Validators.min(0)]],
      fundingUsage: ['', [Validators.required, Validators.minLength(20)]],
      previousFundingSources: ['', [Validators.required]],
      targetMarket: ['', [Validators.required, Validators.minLength(10)]],
      openToCoInvestment: ['', [Validators.required]],
      currentPartners: [''],

      // Step 3: Financial Information
      monthlyRevenue: ['', [Validators.required, Validators.min(0)]],
      isProfitable: ['', [Validators.required]],
      revenueGrowthRate: ['', [Validators.required, Validators.min(0)]],
      revenueGoalNext12Months: ['', [Validators.required, Validators.min(0)]],
      hasDebt: ['', [Validators.required]],
      debtAmount: [''],
      breakEvenPoint: ['', [Validators.required]],
      financialGoalNext3Years: ['', [Validators.required, Validators.minLength(20)]],

      // Step 4: Exit Strategy
      hasExitStrategy: ['', [Validators.required]],
      exitStrategy: [''],
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
          this.startupForm.get('phoneNumber')?.valid &&
          this.startupForm.get('companyName')?.valid &&
          this.startupForm.get('website')?.valid &&
          this.startupForm.get('productService')?.valid &&
          this.startupForm.get('sector')?.valid &&
          this.startupForm.get('operationalStage')?.valid &&
          this.startupForm.get('problemSolved')?.valid
        );
      case 2:
        return !!(
          this.startupForm.get('fundingAmount')?.valid &&
          this.startupForm.get('fundingUsage')?.valid &&
          this.startupForm.get('previousFundingSources')?.valid &&
          this.startupForm.get('targetMarket')?.valid &&
          this.startupForm.get('openToCoInvestment')?.valid
        );
      case 3:
        return !!(
          this.startupForm.get('monthlyRevenue')?.valid &&
          this.startupForm.get('isProfitable')?.valid &&
          this.startupForm.get('revenueGrowthRate')?.valid &&
          this.startupForm.get('revenueGoalNext12Months')?.valid &&
          this.startupForm.get('hasDebt')?.valid &&
          (this.startupForm.get('hasDebt')?.value === 'no' || this.startupForm.get('debtAmount')?.valid) &&
          this.startupForm.get('breakEvenPoint')?.valid &&
          this.startupForm.get('financialGoalNext3Years')?.valid
        );
      case 4:
        return !!(
          this.startupForm.get('hasExitStrategy')?.valid &&
          (this.startupForm.get('hasExitStrategy')?.value === 'no' || this.startupForm.get('exitStrategy')?.valid)
        );
      default:
        return true;
    }
  }

  nextStep() {
    if (this.currentStep < 5) {
        this.currentStep++; // Move to the next step
      }
  }

  // Helper method to mark all form controls for the current step as touched
  markCurrentStepControlsAsTouched() {
    const stepControls = this.getControlsForStep(this.currentStep);
    stepControls.forEach((controlName) => {
      this.startupForm.get(controlName)?.markAsTouched();
    });
  }

  // Helper method to get form controls for the current step
  getControlsForStep(step: number): string[] {
    switch (step) {
      case 1:
        return ['name', 'email', 'phoneNumber', 'companyName', 'website', 'productService', 'sector', 'operationalStage', 'problemSolved'];
      case 2:
        return ['fundingAmount', 'fundingUsage', 'previousFundingSources', 'targetMarket', 'openToCoInvestment'];
      case 3:
        return ['monthlyRevenue', 'isProfitable', 'revenueGrowthRate', 'revenueGoalNext12Months', 'hasDebt', 'debtAmount', 'breakEvenPoint', 'financialGoalNext3Years'];
      case 4:
        return ['hasExitStrategy', 'exitStrategy'];
      default:
        return [];
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.startupForm.valid) {
      console.log('Form Submitted!', this.startupForm.value);
    }
  }
}


/*

nextStep() {
    if (this.currentStep < 5) {
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
