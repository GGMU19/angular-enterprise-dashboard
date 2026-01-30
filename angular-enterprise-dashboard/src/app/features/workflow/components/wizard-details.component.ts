import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

import { WorkflowActions } from '../store/workflow.actions';
import { selectWizardData } from '../store/workflow.selectors';

/**
 * Wizard Step 2: Details
 *
 * Collects detailed project information.
 */
@Component({
  selector: 'app-wizard-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Project Details</mat-card-title>
        <mat-card-subtitle>Add more information about your project</mat-card-subtitle>
      </mat-card-header>

      <mat-card-content>
        <form [formGroup]="detailsForm" class="details-form">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Description</mat-label>
            <textarea
              matInput
              formControlName="description"
              placeholder="Describe your project"
              rows="4"
              required
            >
            </textarea>
            @if (
              detailsForm.get('description')?.hasError('required') &&
              detailsForm.get('description')?.touched
            ) {
              <mat-error>Description is required</mat-error>
            }
          </mat-form-field>

          <div class="date-row">
            <mat-form-field appearance="outline">
              <mat-label>Start Date</mat-label>
              <input matInput [matDatepicker]="startPicker" formControlName="startDate" required />
              <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
              <mat-datepicker #startPicker></mat-datepicker>
              @if (
                detailsForm.get('startDate')?.hasError('required') &&
                detailsForm.get('startDate')?.touched
              ) {
                <mat-error>Start date is required</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>End Date</mat-label>
              <input matInput [matDatepicker]="endPicker" formControlName="endDate" required />
              <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
              <mat-datepicker #endPicker></mat-datepicker>
              @if (
                detailsForm.get('endDate')?.hasError('required') &&
                detailsForm.get('endDate')?.touched
              ) {
                <mat-error>End date is required</mat-error>
              }
            </mat-form-field>
          </div>

          <div class="number-row">
            <mat-form-field appearance="outline">
              <mat-label>Team Size</mat-label>
              <input
                matInput
                type="number"
                formControlName="teamSize"
                min="1"
                placeholder="Number of team members"
                required
              />
              @if (
                detailsForm.get('teamSize')?.hasError('required') &&
                detailsForm.get('teamSize')?.touched
              ) {
                <mat-error>Team size is required</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Budget (USD)</mat-label>
              <input
                matInput
                type="number"
                formControlName="budget"
                min="0"
                placeholder="Estimated budget"
              />
            </mat-form-field>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .details-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem 0;
      }

      .full-width {
        width: 100%;
      }

      .date-row,
      .number-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }

      @media (max-width: 600px) {
        .date-row,
        .number-row {
          grid-template-columns: 1fr;
        }
      }
    `
  ]
})
export class WizardDetailsComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  wizardData = toSignal(this.store.select(selectWizardData));

  detailsForm: FormGroup = this.fb.group({
    description: [this.wizardData()?.description || '', Validators.required],
    startDate: [this.wizardData()?.startDate || null, Validators.required],
    endDate: [this.wizardData()?.endDate || null, Validators.required],
    teamSize: [this.wizardData()?.teamSize || null, [Validators.required, Validators.min(1)]],
    budget: [this.wizardData()?.budget || null]
  });

  constructor() {
    // Update store whenever form changes
    this.detailsForm.valueChanges.subscribe(values => {
      this.store.dispatch(WorkflowActions.updateWizardData({ data: values }));
    });
  }
}
