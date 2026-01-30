import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';

import { WorkflowActions } from './store/workflow.actions';
import {
  selectCurrentStep,
  selectIsFirstStep,
  selectIsLastStep,
  selectStepProgress,
  selectIsSubmitting,
  selectSubmitSuccess,
  selectError
} from './store/workflow.selectors';
import { WizardSetupComponent, WizardDetailsComponent, WizardReviewComponent } from './components';

/**
 * Project Wizard Container
 *
 * Smart component managing the 3-step project creation wizard.
 */
@Component({
  selector: 'app-project-wizard',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    WizardSetupComponent,
    WizardDetailsComponent,
    WizardReviewComponent
  ],
  template: `
    <div class="wizard-container">
      <div class="wizard-header">
        <h1>Create New Project</h1>
        <p>Follow the steps to set up your new project</p>
      </div>

      @if (isSubmitting()) {
        <mat-progress-bar mode="indeterminate" color="primary"></mat-progress-bar>
      } @else {
        <mat-progress-bar mode="determinate" [value]="stepProgress()" color="primary">
        </mat-progress-bar>
      }

      @if (error()) {
        <div class="error-banner">
          <mat-icon>error</mat-icon>
          <span>{{ error() }}</span>
        </div>
      }

      @if (submitSuccess()) {
        <div class="success-banner">
          <mat-icon>check_circle</mat-icon>
          <span>Project created successfully!</span>
          <button mat-button (click)="goToDashboard()">Go to Dashboard</button>
        </div>
      } @else {
        <div class="wizard-content">
          @switch (currentStep()) {
            @case (0) {
              <app-wizard-setup />
            }
            @case (1) {
              <app-wizard-details />
            }
            @case (2) {
              <app-wizard-review />
            }
          }
        </div>

        <div class="wizard-actions">
          <button mat-stroked-button [disabled]="isFirstStep()" (click)="previousStep()">
            <mat-icon>arrow_back</mat-icon>
            Previous
          </button>

          <div class="step-indicator">Step {{ currentStep() + 1 }} of 3</div>

          @if (!isLastStep()) {
            <button mat-raised-button color="primary" (click)="nextStep()">
              Next
              <mat-icon>arrow_forward</mat-icon>
            </button>
          } @else {
            <button
              mat-raised-button
              color="primary"
              [disabled]="isSubmitting()"
              (click)="submit()"
            >
              <mat-icon>check</mat-icon>
              Submit
            </button>
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
      .wizard-container {
        max-width: 800px;
        margin: 2rem auto;
        padding: 2rem;
      }

      .wizard-header {
        text-align: center;
        margin-bottom: 2rem;

        h1 {
          margin: 0 0 0.5rem 0;
          color: #1976d2;
        }

        p {
          margin: 0;
          color: #666;
        }
      }

      mat-progress-bar {
        margin-bottom: 2rem;
      }

      .error-banner,
      .success-banner {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        margin-bottom: 2rem;
        border-radius: 4px;

        mat-icon {
          font-size: 24px;
          width: 24px;
          height: 24px;
        }
      }

      .error-banner {
        background-color: #ffebee;
        color: #c62828;
      }

      .success-banner {
        background-color: #e8f5e9;
        color: #2e7d32;
      }

      .wizard-content {
        min-height: 400px;
        margin-bottom: 2rem;
      }

      .wizard-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 2rem;
        border-top: 1px solid #e0e0e0;

        .step-indicator {
          font-weight: 500;
          color: #666;
        }

        button {
          mat-icon {
            margin: 0 4px;
          }
        }
      }
    `
  ]
})
export class ProjectWizardComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);

  currentStep = toSignal(this.store.select(selectCurrentStep), { initialValue: 0 });
  isFirstStep = toSignal(this.store.select(selectIsFirstStep), { initialValue: true });
  isLastStep = toSignal(this.store.select(selectIsLastStep), { initialValue: false });
  stepProgress = toSignal(this.store.select(selectStepProgress), { initialValue: 33 });
  isSubmitting = toSignal(this.store.select(selectIsSubmitting), { initialValue: false });
  submitSuccess = toSignal(this.store.select(selectSubmitSuccess), { initialValue: false });
  error = toSignal(this.store.select(selectError), { initialValue: null });

  ngOnInit(): void {
    // Reset wizard when component initializes
    this.store.dispatch(WorkflowActions.resetWizard());
  }

  nextStep(): void {
    this.store.dispatch(WorkflowActions.nextStep());
  }

  previousStep(): void {
    this.store.dispatch(WorkflowActions.previousStep());
  }

  submit(): void {
    this.store.dispatch(WorkflowActions.submitWizard());
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
