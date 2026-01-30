import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

import { WorkflowActions } from '../store/workflow.actions';
import { selectWizardData } from '../store/workflow.selectors';

/**
 * Wizard Step 1: Setup
 *
 * Collects basic project information.
 */
@Component({
  selector: 'app-wizard-setup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Project Setup</mat-card-title>
        <mat-card-subtitle>Enter basic project information</mat-card-subtitle>
      </mat-card-header>

      <mat-card-content>
        <form [formGroup]="setupForm" class="setup-form">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Project Name</mat-label>
            <input
              matInput
              formControlName="projectName"
              placeholder="Enter project name"
              required
            />
            @if (
              setupForm.get('projectName')?.hasError('required') &&
              setupForm.get('projectName')?.touched
            ) {
              <mat-error>Project name is required</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Project Type</mat-label>
            <mat-select formControlName="projectType" required>
              <mat-option value="web">Web Application</mat-option>
              <mat-option value="mobile">Mobile App</mat-option>
              <mat-option value="desktop">Desktop Application</mat-option>
              <mat-option value="api">API/Backend</mat-option>
            </mat-select>
            @if (
              setupForm.get('projectType')?.hasError('required') &&
              setupForm.get('projectType')?.touched
            ) {
              <mat-error>Project type is required</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Priority</mat-label>
            <mat-select formControlName="priority" required>
              <mat-option value="low">Low</mat-option>
              <mat-option value="medium">Medium</mat-option>
              <mat-option value="high">High</mat-option>
            </mat-select>
            @if (
              setupForm.get('priority')?.hasError('required') && setupForm.get('priority')?.touched
            ) {
              <mat-error>Priority is required</mat-error>
            }
          </mat-form-field>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .setup-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem 0;
      }

      .full-width {
        width: 100%;
      }
    `
  ]
})
export class WizardSetupComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  wizardData = toSignal(this.store.select(selectWizardData));

  setupForm: FormGroup = this.fb.group({
    projectName: [this.wizardData()?.projectName || '', Validators.required],
    projectType: [this.wizardData()?.projectType || '', Validators.required],
    priority: [this.wizardData()?.priority || '', Validators.required]
  });

  constructor() {
    // Update store whenever form changes
    this.setupForm.valueChanges.subscribe(values => {
      this.store.dispatch(WorkflowActions.updateWizardData({ data: values }));
    });
  }
}
