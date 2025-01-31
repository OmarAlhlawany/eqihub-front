import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-startup-form',
  templateUrl: './startup-form.component.html',
  styleUrls: ['./startup-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class StartupFormComponent implements OnInit {
  startupForm: FormGroup;
  currentStep: number = 1;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private headerService: HeaderService
  ) {
    this.startupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      company: ['', Validators.required],
      businessModel: ['', Validators.required],
      fundingStage: ['', Validators.required],
      fundingAmount: ['', Validators.required],
      projectBudget: ['', Validators.required],
      geographicalScope: ['', Validators.required],
      coInvest: ['', Validators.required],
      additionalNotes: [''],
      otherBudget: [''],
    });
  }

  ngOnInit(): void {
    this.headerService.setTitle('Join as Startup');
  }

  goToStep(step: number) {
    this.currentStep = step;
  }

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
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