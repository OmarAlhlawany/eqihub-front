import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderService } from '../services/header.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-investor-form',
  templateUrl: './investor-form.component.html',
  styleUrls: ['./investor-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
})
export class InvestorFormComponent implements OnInit {
  investorForm: FormGroup;
  currentStep: number = 1;

  tags: string[] = [
    'INVESTOR_FORM.STEP_2.TAG_TECHNOLOGY',
    'INVESTOR_FORM.STEP_2.TAG_FINTECH',
    'INVESTOR_FORM.STEP_2.TAG_ECOMMERCE',
    'INVESTOR_FORM.STEP_2.TAG_HEALTHCARE',
    'INVESTOR_FORM.STEP_2.TAG_EDTECH',
    'INVESTOR_FORM.STEP_2.TAG_RENEWABLE_ENERGY',
    'INVESTOR_FORM.STEP_2.TAG_MANUFACTURING',
    'INVESTOR_FORM.STEP_2.TAG_LOGISTICS',
    'INVESTOR_FORM.STEP_2.TAG_REAL_ESTATE',
    'INVESTOR_FORM.STEP_2.TAG_AI',
    'INVESTOR_FORM.STEP_2.TAG_BIG_DATA',
    'INVESTOR_FORM.STEP_2.TAG_CYBERSECURITY',
    'INVESTOR_FORM.STEP_2.TAG_DIGITAL_MARKETING',
    'INVESTOR_FORM.STEP_2.TAG_GENERAL_TRADE',
    'INVESTOR_FORM.STEP_2.TAG_TRAVEL_TOURISM',
    'INVESTOR_FORM.STEP_2.TAG_FOOD_BEVERAGE',
    'INVESTOR_FORM.STEP_2.TAG_RETAIL',
    'INVESTOR_FORM.STEP_2.TAG_SPORTS_ENTERTAINMENT',
    'INVESTOR_FORM.STEP_2.TAG_ROBOTICS',
    'INVESTOR_FORM.STEP_2.TAG_AGRITECH',
    'INVESTOR_FORM.STEP_2.TAG_ENVIRONMENT_SUSTAINABILITY',
    'INVESTOR_FORM.STEP_2.TAG_AR_VR',
    'INVESTOR_FORM.STEP_2.TAG_DIGITAL_PAYMENTS',
    'INVESTOR_FORM.STEP_2.TAG_FINANCIAL_SERVICES',
    'INVESTOR_FORM.STEP_2.TAG_MEDIA_COMMUNICATION',
    'INVESTOR_FORM.STEP_2.TAG_GAMING',
    'INVESTOR_FORM.STEP_2.TAG_BIOTECH',
    'INVESTOR_FORM.STEP_2.TAG_INSURTECH',
    'INVESTOR_FORM.STEP_2.TAG_PROPERTY_DEVELOPMENT',
    'INVESTOR_FORM.STEP_2.TAG_SOCIAL_INNOVATION'
  ];

  showDropdown = false; // Controls dropdown visibility
  selectedTags: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private headerService: HeaderService,
    private translate: TranslateService
  ) {
    this.investorForm = this.fb.group({
      // Step 1
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]], // Example: 10-15 digits
      company: ['', [Validators.required, Validators.minLength(2)]],
      // Step 2
      investment: ['', Validators.required],
      favoriteInvestment: ['', Validators.required],
      favoriteSectors: ['', Validators.required],
      // Step 3
      projectBudget: ['', Validators.required],
      otherBudget: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]], // Only numbers allowed
      // Step 4
      geographicalScope: ['', Validators.required],
      coInvest: ['', Validators.required],
      investmentPrivacy: ['', Validators.required], // Investment Privacy (New Dropdown)
      additionalNotes: [''],
    });

    this.translate.setDefaultLang('en');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  onInvestmentChange() {
    const investmentControl = this.investorForm.get('investment');
    if (investmentControl) {
      investmentControl.markAsTouched(); // Mark as touched
      investmentControl.markAsDirty(); // Mark as dirty
      investmentControl.updateValueAndValidity(); // Trigger revalidation
    }
  }

  onFavoriteInvestmentChange() {
    const favoriteInvestmentControl = this.investorForm.get('favoriteInvestment');
    if (favoriteInvestmentControl) {
      favoriteInvestmentControl.markAsTouched(); // Mark as touched
      favoriteInvestmentControl.markAsDirty(); // Mark as dirty
      favoriteInvestmentControl.updateValueAndValidity(); // Trigger revalidation
    }
  }

  selectTag(tag: string): void {
    if (!this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);
      this.updateFavoriteSectors();
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  toggleTag(tag: string): void {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    } else {
      this.selectedTags.push(tag);
    }
    this.updateFavoriteSectors();
  }

  removeTag(tag: string): void {
    this.selectedTags = this.selectedTags.filter((t) => t !== tag);
    this.updateFavoriteSectors();
  }

  private updateFavoriteSectors(): void {
    const translatedTags = this.selectedTags.map(tag => this.translate.instant(tag));
    this.investorForm.controls['favoriteSectors'].setValue(translatedTags.join(', '));
    this.investorForm.controls['favoriteSectors'].markAsTouched(); // Mark as touched
    this.investorForm.controls['favoriteSectors'].markAsDirty(); // Mark as dirty
    this.investorForm.controls['favoriteSectors'].updateValueAndValidity(); // Trigger revalidation
  }

  ngOnInit(): void {
    this.headerService.setTitle(this.translate.instant('INVESTOR_FORM.TITLE'));
  }

  goToStep(step: number) {
    this.currentStep = step;
  }

  isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        return !!(
          this.investorForm.get('name')?.valid &&
          this.investorForm.get('email')?.valid &&
          this.investorForm.get('phoneNumber')?.valid &&
          this.investorForm.get('company')?.valid
        );
      case 2:
        return !!(
          this.investorForm.get('investment')?.valid &&
          this.investorForm.get('favoriteInvestment')?.valid &&
          this.investorForm.get('favoriteSectors')?.valid
        );
        case 3:
          const projectBudget = this.investorForm.get('projectBudget')?.value;
          const otherBudgetValid = projectBudget !== 'Other' || this.investorForm.get('otherBudget')?.valid;
          return !!(
            this.investorForm.get('projectBudget')?.valid &&
            otherBudgetValid
          );
      case 4:
        return !!(
          this.investorForm.get('geographicalScope')?.valid &&
          this.investorForm.get('coInvest')?.valid &&
          this.investorForm.get('investmentPrivacy')?.valid
        );
      default:
        return true;
    }
  }

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

  // Helper method to mark all form controls for the current step as touched
  markCurrentStepControlsAsTouched() {
    const stepControls = this.getControlsForStep(this.currentStep);
    stepControls.forEach((controlName) => {
      this.investorForm.get(controlName)?.markAsTouched();
    });
  }
    // Helper method to get form controls for the current step
  getControlsForStep(step: number): string[] {
    switch (step) {
      case 1:
        return ['name', 'email', 'phoneNumber', 'company'];
      case 2:
        return ['investment', 'favoriteInvestment', 'favoriteSectors'];
      case 3:
        return ['projectBudget', 'otherBudget'];
      case 4:
        return ['geographicalScope', 'coInvest', 'investmentPrivacy'];
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
    if (this.investorForm.valid) {
      console.log('Form Submitted!', this.investorForm.value);
    }
  }
}