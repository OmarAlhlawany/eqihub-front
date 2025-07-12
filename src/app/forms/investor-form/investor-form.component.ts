import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderService } from '../../services/header.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';

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
  dynamicData: any = {}; // To store dynamic tables data
  isLoading: boolean = false;
  showDropdown: boolean = false; // Controls dropdown visibility
  selectedTags: string[] = []; // Stores selected tags for favourite sectors

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
      phone_number: ['', [Validators.required, Validators.pattern('^[- +()0-9]+$')]],
      company: ['', [Validators.required, Validators.minLength(2)]],
      // Step 2
      investment_type_id: ['', Validators.required],
      favourite_investment_stage_id: ['', Validators.required],
      favourite_sectors: [[], Validators.required], // Array of selected sector IDs
      // Step 3
      budget_range_id: ['', Validators.required],
      other_budget: ['', [Validators.pattern(/^[0-9]+$/)]], // Optional, only required if "Other" is selected
      // Step 4
      geographical_scope_id: ['', Validators.required],
      co_invest_id: ['', Validators.required],
      investment_privacy_option_id: ['', Validators.required],
      additional_notes: [''],
    });

    // Watch for changes in budget and dynamically set the validator for otherBudget
    this.investorForm.get('budget_range_id')?.valueChanges.subscribe((value) => {
      this.updateOtherBudgetValidation(value);
    });
  }

  ngOnInit(): void {
    this.headerService.setTitle(this.translate.instant('INVESTOR_FORM.TITLE'));
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
   * Update validation for "other_budget" based on selected budget
   */
  private updateOtherBudgetValidation(selectedBudget: string): void {
    const otherBudgetControl = this.investorForm.get('other_budget');
    if (selectedBudget === 'Other') {
      otherBudgetControl?.setValidators([Validators.required, Validators.pattern(/^[0-9]+$/)]);
    } else {
      otherBudgetControl?.clearValidators();
    }
    otherBudgetControl?.updateValueAndValidity();
  }

  /**
   * Toggle dropdown visibility
   */
  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  /**
   * Toggle tag selection for favourite sectors
   */
  toggleTag(tag: any): void {
    const selectedSectors = this.investorForm.get('favourite_sectors')?.value;
    if (selectedSectors.includes(tag.id)) {
      this.selectedTags = selectedSectors.filter((id: number) => id !== tag.id);
    } else {
      this.selectedTags = [...selectedSectors, tag.id];
    }
    this.investorForm.get('favourite_sectors')?.setValue(this.selectedTags);
  }

  /**
   * Remove a selected tag
   */
  removeTag(tagValue: string): void {
    this.selectedTags = this.selectedTags.filter((tag) => tag !== tagValue);
    this.investorForm.get('favourite_sectors')?.setValue(this.selectedTags);
  }

  /**
   * Get the label for a tag
   */
  getTagLabel(tagValue: string): string {
    const tag = this.dynamicData.favourite_sectors?.find((sector: any) => sector.id === tagValue);
    return tag ? tag.name : tagValue; // Fallback to the original value if not found
  }

  /**
   * Move to the next step
   */
  nextStep(): void {
    if (this.currentStep < 5) {
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
          this.investorForm.get('name')?.valid &&
          this.investorForm.get('email')?.valid &&
          this.investorForm.get('phone_number')?.valid &&
          this.investorForm.get('company')?.valid
        );
      case 2:
        return !!(
          this.investorForm.get('investment_type_id')?.valid &&
          this.investorForm.get('favourite_investment_stage_id')?.valid &&
          this.investorForm.get('favourite_sectors')?.valid
        );
      case 3:
        const budget = this.investorForm.get('budget_range_id')?.value;
        const otherBudgetValid = budget !== 'Other' || this.investorForm.get('other_budget')?.valid;
        return !!(this.investorForm.get('budget_range_id')?.valid && otherBudgetValid);
      case 4:
        return !!(
          this.investorForm.get('geographical_scope_id')?.valid &&
          this.investorForm.get('co_invest_id')?.valid &&
          this.investorForm.get('investment_privacy_option_id')?.valid
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
      this.investorForm.get(controlName)?.markAsTouched();
    });
  }

  /**
   * Get form controls for the current step
   */
  getControlsForStep(step: number): string[] {
    switch (step) {
      case 1:
        return ['name', 'email', 'phone_number', 'company'];
      case 2:
        return ['investment_type_id', 'favourite_investment_stage_id', 'favourite_sectors'];
      case 3:
        return ['budget_range_id', 'other_budget'];
      case 4:
        return ['geographical_scope_id', 'co_invest_id', 'investment_privacy_option_id'];
      default:
        return [];
    }
  }

  /**
   * Submit the form
   */
  onSubmit(): void {
    if (this.investorForm.valid) {
      const formData = this.investorForm.value;
      this.apiService.submitInvestorForm(formData).subscribe({
        next: (response) => {
          console.log('Investor registered successfully:', response);
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