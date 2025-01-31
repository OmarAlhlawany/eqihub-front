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
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      company: ['', Validators.required],
      investment: ['', Validators.required],
      favoriteInvestment: ['', Validators.required],
      favoriteSectors: ['', Validators.required],
      projectBudget: ['', Validators.required],
      geographicalScope: ['', Validators.required],
      coInvest: ['', Validators.required],
      investmentPrivacy: ['', Validators.required], // Investment Privacy (New Dropdown)
      additionalNotes: [''],
      otherBudget: [''],
    });

    this.translate.setDefaultLang('en');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
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
  }

  ngOnInit(): void {
    this.headerService.setTitle(this.translate.instant('INVESTOR_FORM.TITLE'));
  }

  goToStep(step: number) {
    this.currentStep = step;
  }

  nextStep() {
    if (this.currentStep < 5) {
      this.currentStep++;
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
