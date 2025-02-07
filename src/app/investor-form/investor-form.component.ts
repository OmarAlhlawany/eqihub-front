import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderService } from '../services/header.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../services/api.service';

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

  tags: { value: string; label: string }[] = [
    { value: 'Technology', label: 'INVESTOR_FORM.STEP_2.TAG_TECHNOLOGY' },
    { value: 'FinTech', label: 'INVESTOR_FORM.STEP_2.TAG_FINTECH' },
    { value: 'E-Commerce', label: 'INVESTOR_FORM.STEP_2.TAG_ECOMMERCE' },
    { value: 'Healthcare & HealthTech', label: 'INVESTOR_FORM.STEP_2.TAG_HEALTHCARE' },
    { value: 'Education & EdTech', label: 'INVESTOR_FORM.STEP_2.TAG_EDTECH' },
    { value: 'Renewable Energy', label: 'INVESTOR_FORM.STEP_2.TAG_RENEWABLE_ENERGY' },
    { value: 'Manufacturing', label: 'INVESTOR_FORM.STEP_2.TAG_MANUFACTURING' },
    { value: 'Logistics & Transportation', label: 'INVESTOR_FORM.STEP_2.TAG_LOGISTICS' },
    { value: 'Real Estate', label: 'INVESTOR_FORM.STEP_2.TAG_REAL_ESTATE' },
    { value: 'Artificial Intelligence', label: 'INVESTOR_FORM.STEP_2.TAG_AI' },
    { value: 'Big Data & Analytics', label: 'INVESTOR_FORM.STEP_2.TAG_BIG_DATA' },
    { value: 'CyperSecurity', label: 'INVESTOR_FORM.STEP_2.TAG_CYBERSECURITY' },
    { value: 'Digital Marketing', label: 'INVESTOR_FORM.STEP_2.TAG_DIGITAL_MARKETING' },
    { value: 'General Trade', label: 'INVESTOR_FORM.STEP_2.TAG_GENERAL_TRADE' },
    { value: 'Travel & Tourism', label: 'INVESTOR_FORM.STEP_2.TAG_TRAVEL_TOURISM' },
    { value: 'Food & Baverage', label: 'INVESTOR_FORM.STEP_2.TAG_FOOD_BEVERAGE' },
    { value: 'Retail', label: 'INVESTOR_FORM.STEP_2.TAG_RETAIL' },
    { value: 'Sports & Entertainment', label: 'INVESTOR_FORM.STEP_2.TAG_SPORTS_ENTERTAINMENT' },
    { value: 'Robotics', label: 'INVESTOR_FORM.STEP_2.TAG_ROBOTICS' },
    { value: 'AgriTech', label: 'INVESTOR_FORM.STEP_2.TAG_AGRITECH' },
    { value: 'Environmental & Sustainability', label: 'INVESTOR_FORM.STEP_2.TAG_ENVIRONMENT_SUSTAINABILITY' },
    { value: 'AR/VR', label: 'INVESTOR_FORM.STEP_2.TAG_AR_VR' },
    { value: 'Digital Payments', label: 'INVESTOR_FORM.STEP_2.TAG_DIGITAL_PAYMENTS' },
    { value: 'Financial Services', label: 'INVESTOR_FORM.STEP_2.TAG_FINANCIAL_SERVICES' },
    { value: 'Media & Communication', label: 'INVESTOR_FORM.STEP_2.TAG_MEDIA_COMMUNICATION' },
    { value: 'Gaming', label: 'INVESTOR_FORM.STEP_2.TAG_GAMING' },
    { value: 'BioTech', label: 'INVESTOR_FORM.STEP_2.TAG_BIOTECH' },
    { value: 'InsurTech', label: 'INVESTOR_FORM.STEP_2.TAG_INSURTECH' },
    { value: 'Property Development', label: 'INVESTOR_FORM.STEP_2.TAG_PROPERTY_DEVELOPMENT' },
    { value: 'Social Innovation', label: 'INVESTOR_FORM.STEP_2.TAG_SOCIAL_INNOVATION' }
  ];

  showDropdown = false; // Controls dropdown visibility
  selectedTags: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private headerService: HeaderService,
    private translate: TranslateService,
    private apiService: ApiService
  ) {
    this.investorForm = this.fb.group({
      // Step 1
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern('^[- +()0-9]+$')]], // Allow only digits, spaces, hyphens, and plus signs
      company: ['', [Validators.required, Validators.minLength(2)]],
      // Step 2
      investment: ['', Validators.required],
      favourite_investment: ['', Validators.required],
      favourite_sectors: ['', Validators.required],
      // Step 3
      budget: ['', Validators.required],
      other_budget: ['', [Validators.pattern(/^[0-9]+$/)]], // Remove Validators.required here
      // Step 4
      geographical_scope: ['', Validators.required],
      co_invest: ['', Validators.required],
      investment_private: ['', Validators.required], // Investment Privacy (New Dropdown)
      additional_notes: [''],
    });

      // Watch for changes in budget and dynamically set the validator for otherBudget
  this.investorForm.get('budget')?.valueChanges.subscribe((value) => {
    this.updateOtherBudgetValidation(value);
  });

  
    this.translate.setDefaultLang('en');
  }

  private updateOtherBudgetValidation(selectedBudget: string): void {
    const otherBudgetControl = this.investorForm.get('other_budget');
  
    if (selectedBudget === 'Other') {
      otherBudgetControl?.setValidators([Validators.required, Validators.pattern(/^[0-9]+$/)]);
    } else {
      otherBudgetControl?.clearValidators();
    }
  
    otherBudgetControl?.updateValueAndValidity();
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
    const favoriteInvestmentControl = this.investorForm.get('favorite_investment');
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

  getTagLabel(tagValue: string): string {
    const tag = this.tags.find(t => t.value === tagValue);
    return tag ? tag.label : tagValue; // Fallback to the original value if not found
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  toggleTag(tag: { value: string; label: string }): void {
    if (this.selectedTags.includes(tag.value)) {
      this.selectedTags = this.selectedTags.filter(t => t !== tag.value);
    } else {
      this.selectedTags.push(tag.value);
    }
    this.updateFavoriteSectors();
  }

  removeTag(tagValue: string): void {
    this.selectedTags = this.selectedTags.filter(t => t !== tagValue);
    this.updateFavoriteSectors();
  }

  private updateFavoriteSectors(): void {
    this.investorForm.controls['favourite_sectors'].setValue(this.selectedTags);
    this.investorForm.controls['favourite_sectors'].markAsTouched(); // Mark as touched
    this.investorForm.controls['favourite_sectors'].markAsDirty(); // Mark as dirty
    this.investorForm.controls['favourite_sectors'].updateValueAndValidity(); // Trigger revalidation
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
          this.investorForm.get('phone_number')?.valid &&
          this.investorForm.get('company')?.valid
        );
      case 2:
        return !!(
          this.investorForm.get('investment')?.valid &&
          this.investorForm.get('favourite_investment')?.valid &&
          this.investorForm.get('favourite_sectors')?.valid
        );
        case 3:
          const budget = this.investorForm.get('budget')?.value;
          const otherBudgetValid = budget !== 'Other' || this.investorForm.get('other_budget')?.valid;
          return !!(this.investorForm.get('budget')?.valid && otherBudgetValid);
    
      case 4:
        return !!(
          this.investorForm.get('geographical_scope')?.valid &&
          this.investorForm.get('co_invest')?.valid &&
          this.investorForm.get('investment_private')?.valid
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
        return ['name', 'email', 'phone_number', 'company'];
      case 2:
        return ['investment', 'favourite_investment', 'favourite_sectors'];
      case 3:
        return ['budget', 'other_budget'];
      case 4:
        return ['geographical_scope', 'co_invest', 'investment_private'];
      default:
        return [];
    }
  }
  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

   // Helper method to log invalid controls and their errors
   logInvalidControls() {
    Object.keys(this.investorForm.controls).forEach((controlName) => {
      const control = this.investorForm.get(controlName);
      if (control && control.invalid) {
        console.log(`Invalid Control: ${controlName}`);
        console.log('Errors:', control.errors); // Log the validation errors
      }
    });
  }
  onSubmit() {
    if (this.investorForm.valid) {
      const formData = this.investorForm.value;
      console.log('Form Submitted!', formData);
      
      // Send the form data to the API
      this.apiService.submitInvestorForm(formData).subscribe({
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
   if (this.currentStep < 5) {
      this.currentStep++; // Move to the next step
    }
  }
*/

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