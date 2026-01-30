import { Component, Input, Output, EventEmitter, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormConfig } from '../../../core/models/form-config.model';
import { FormBuilderService } from '../../../core/services/form-builder.service';
import { FormSectionComponent } from './index';

/**
 * Dynamic Form Container Component
 *
 * Smart component that orchestrates the entire dynamic form rendering.
 * Manages form state, validation, and submission.
 */
@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    FormSectionComponent
  ],
  styleUrl: './dynamic-form.component.css',
  template: `
    <div class="dynamic-form" [class]="'layout-' + (config()?.layout || 'vertical')">
      @if (config(); as formConfig) {
        <!-- Form Header -->
        <div class="form-header">
          <h2>{{ formConfig.title }}</h2>
          @if (formConfig.description) {
            <p class="form-description">{{ formConfig.description }}</p>
          }
        </div>

        <!-- Progress Bar -->
        @if (formConfig.showProgressBar && progress() > 0) {
          <mat-progress-bar
            mode="determinate"
            [value]="progress()"
            class="form-progress"
          ></mat-progress-bar>
        }

        <!-- Form Content -->
        <form [formGroup]="form()" (ngSubmit)="handleSubmit()" class="form-content">
          @for (section of formConfig.sections; track section.title) {
            <app-form-section
              [sectionConfig]="section"
              [form]="form()"
              [data]="formData()"
            ></app-form-section>
          }

          <!-- Form Actions -->
          <div class="form-actions">
            @if (formConfig.cancelButtonText) {
              <button
                type="button"
                mat-stroked-button
                (click)="handleCancel()"
                [disabled]="isSubmitting()"
              >
                <mat-icon>close</mat-icon>
                {{ formConfig.cancelButtonText }}
              </button>
            }

            @if (formConfig.allowSaveProgress) {
              <button
                type="button"
                mat-stroked-button
                color="accent"
                (click)="handleSaveProgress()"
                [disabled]="isSubmitting()"
              >
                <mat-icon>save</mat-icon>
                Save Progress
              </button>
            }

            <button
              type="submit"
              mat-raised-button
              color="primary"
              [disabled]="!form().valid || isSubmitting()"
            >
              @if (isSubmitting()) {
                <ng-container>
                  <mat-icon>hourglass_empty</mat-icon>
                  Submitting...
                </ng-container>
              } @else {
                <ng-container>
                  <mat-icon>send</mat-icon>
                  {{ formConfig.submitButtonText || 'Submit' }}
                </ng-container>
              }
            </button>
          </div>
        </form>
      }
    </div>
  `
})
export class DynamicFormComponent {
  @Input({ required: true }) set formConfig(value: FormConfig) {
    this.config.set(value);
  }

  @Input() set initialData(value: Record<string, unknown> | null) {
    if (value) {
      this.formData.set(value);
    }
  }

  @Output() formSubmit = new EventEmitter<Record<string, unknown>>();
  @Output() formCancel = new EventEmitter<void>();
  @Output() saveProgress = new EventEmitter<Record<string, unknown>>();

  private formBuilderService = inject(FormBuilderService);

  config = signal<FormConfig | null>(null);
  form = signal<FormGroup>(new FormGroup({}));
  formData = signal<Record<string, unknown>>({});
  isSubmitting = signal(false);
  progress = signal(0);

  constructor() {
    // Rebuild form when config changes
    effect(() => {
      const currentConfig = this.config();
      if (currentConfig) {
        const newForm = this.formBuilderService.buildForm(currentConfig);
        this.form.set(newForm);

        // Patch initial data if available
        const data = this.formData();
        if (Object.keys(data).length > 0) {
          this.formBuilderService.patchFormValues(newForm, data);
        }

        // Subscribe to form value changes
        newForm.valueChanges.subscribe(values => {
          this.formData.set(values);
          this.calculateProgress();
        });
      }
    });
  }

  private calculateProgress(): void {
    const currentForm = this.form();
    const currentConfig = this.config();

    if (!currentForm || !currentConfig) {
      return;
    }

    const allFields = this.formBuilderService.getFieldNames(currentConfig);
    const requiredFields = allFields.filter(name => {
      const field = this.formBuilderService.getFieldConfig(currentConfig, name);
      return field?.required;
    });

    if (requiredFields.length === 0) {
      this.progress.set(100);
      return;
    }

    const filledFields = requiredFields.filter(name => {
      const control = currentForm.get(name);
      return control?.value !== null && control?.value !== '' && control?.value !== undefined;
    });

    const progressValue = Math.round((filledFields.length / requiredFields.length) * 100);
    this.progress.set(progressValue);
  }

  handleSubmit(): void {
    const currentForm = this.form();

    if (!currentForm.valid) {
      // Mark all fields as touched to show validation errors
      Object.keys(currentForm.controls).forEach(key => {
        currentForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmitting.set(true);
    this.formSubmit.emit(currentForm.value);

    // Reset submitting state after a delay (parent should handle this)
    setTimeout(() => this.isSubmitting.set(false), 2000);
  }

  handleCancel(): void {
    this.formCancel.emit();
  }

  handleSaveProgress(): void {
    this.saveProgress.emit(this.form().value);
  }

  // Public methods for parent components
  resetForm(): void {
    const currentConfig = this.config();
    const currentForm = this.form();

    if (currentConfig && currentForm) {
      this.formBuilderService.resetForm(currentForm, currentConfig);
      this.formData.set({});
      this.progress.set(0);
    }
  }

  isValid(): boolean {
    return this.form().valid;
  }

  getValue(): Record<string, unknown> {
    return this.form().value;
  }
}
