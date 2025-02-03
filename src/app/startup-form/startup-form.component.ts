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
  currentStep: number = 1; // Start from step 1

  
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
      phoneNumber: ['', [Validators.required, Validators.pattern('^[- +()0-9]+$')]],
      companyName: ['', [Validators.required, Validators.minLength(2)]],
      website: ['', [Validators.required, Validators.pattern(/^(http|https):\/\/[^ "]+$/)]],
      productService: ['', [Validators.required, Validators.minLength(10)]],
      sector: ['', [Validators.required]],
      operationalStage: ['', [Validators.required]],
      problemSolved: ['', [Validators.required, Validators.minLength(20)]],

      // Step 2: Funding Details
      fundingAmount: ['', [Validators.required]],
      fundingUsage: ['', [Validators.required, Validators.minLength(20)]],
      previousFundingSources: ['', [Validators.required]],
      targetMarket: ['', [Validators.required]],
      openToJointInvestment: ['', [Validators.required]],
      hasExistingPartners: ['', [Validators.required]],

      // Step 3: Financial Information
      monthlyRevenue: ['', [Validators.required, Validators.min(0)]],
      isProfitable: ['', [Validators.required]],
      profitPercentage: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      revenueGoal: ['', [Validators.required, Validators.min(0)]],

      // Step 4: Exit Strategy
      hasMajorDebts: ['', [Validators.required]],
      currentDebtSize: [''],
      breakEvenPoint: ['', [Validators.required]],
      financialGoal: ['', [Validators.required, Validators.minLength(20)]],
      hasExitStrategy: ['', [Validators.required]],
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
          this.startupForm.get('phoneNumber')?.valid &&
          this.startupForm.get('companyName')?.valid &&
          this.startupForm.get('website')?.valid
        );
      case 2:
        return !!(
          this.startupForm.get('productService')?.valid &&
          this.startupForm.get('sector')?.valid &&
          this.startupForm.get('operationalStage')?.valid &&
          this.startupForm.get('problemSolved')?.valid
        );
      case 3:
        return !!(
          this.startupForm.get('fundingAmount')?.valid &&
          this.startupForm.get('fundingUsage')?.valid &&
          this.startupForm.get('previousFundingSources')?.valid &&
          this.startupForm.get('targetMarket')?.valid 
        );
      case 4:
        return !!(
          this.startupForm.get('openToJointInvestment')?.valid &&
          this.startupForm.get('hasExistingPartners')?.valid&&
          this.startupForm.get('monthlyRevenue')?.valid &&
          this.startupForm.get('isProfitable')?.valid &&
          this.startupForm.get('profitPercentage')?.valid &&
          this.startupForm.get('revenueGoal')?.valid
        );
      case 5:
        return !!(
          this.startupForm.get('hasMajorDebts')?.valid &&
          (this.startupForm.get('hasMajorDebts')?.value === 'no' || this.startupForm.get('currentDebtSize')?.valid) &&
          this.startupForm.get('breakEvenPoint')?.valid &&
          this.startupForm.get('financialGoal')?.valid &&
          this.startupForm.get('hasExitStrategy')?.valid &&
          (this.startupForm.get('hasExitStrategy')?.value === 'no' || this.startupForm.get('exitStrategyDetails')?.valid)
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
        return ['name', 'email', 'phoneNumber', 'companyName', 'website'];
      case 2:
        return ['productService', 'sector', 'operationalStage', 'problemSolved'];
      case 3:
        return ['fundingAmount', 'fundingUsage', 'previousFundingSources', 'targetMarket', 'openToJointInvestment', 'hasExistingPartners'];
      case 4:
        return ['monthlyRevenue', 'isProfitable', 'profitPercentage', 'revenueGoal'];
      case 5:
        return ['hasMajorDebts', 'currentDebtSize', 'breakEvenPoint', 'financialGoal', 'hasExitStrategy', 'exitStrategyDetails'];
      default:
        return [];
    }
  }

  onSubmit() {
    if (this.startupForm.valid) {
      console.log('Form Submitted!', this.startupForm.value);
      // You can add your form submission logic here (e.g., API call)
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
