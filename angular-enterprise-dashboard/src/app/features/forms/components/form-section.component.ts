import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { FormSection } from '../../../core/models/form-config.model';
import { FormFieldRendererComponent } from './index';

/**
 * Form Section Component
 *
 * Renders a section of form fields with optional collapsible container.
 */
@Component({
  selector: 'app-form-section',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatIconModule,
    FormFieldRendererComponent
  ],
  template: `
    @if (section(); as sectionData) {
      @if (sectionData.collapsible) {
        <mat-expansion-panel [expanded]="!sectionData.collapsed" class="form-section-panel">
          <mat-expansion-panel-header>
            <mat-panel-title>
              <mat-icon>folder</mat-icon>
              {{ sectionData.title }}
            </mat-panel-title>
            @if (sectionData.description) {
              <mat-panel-description>
                {{ sectionData.description }}
              </mat-panel-description>
            }
          </mat-expansion-panel-header>

          <div class="section-fields">
            @for (field of sectionData.fields; track field.name) {
              <app-form-field-renderer
                [fieldConfig]="field"
                [form]="formGroup()"
                [data]="formData()"
              ></app-form-field-renderer>
            }
          </div>
        </mat-expansion-panel>
      } @else {
        <div class="form-section">
          <div class="section-header">
            <h3>{{ sectionData.title }}</h3>
            @if (sectionData.description) {
              <p class="section-description">{{ sectionData.description }}</p>
            }
          </div>

          <div class="section-fields">
            @for (field of sectionData.fields; track field.name) {
              <app-form-field-renderer
                [fieldConfig]="field"
                [form]="formGroup()"
                [data]="formData()"
              ></app-form-field-renderer>
            }
          </div>
        </div>
      }
    }
  `,
  styles: [
    `
      .form-section {
        .section-header {
          margin-bottom: 16px;

          h3 {
            margin: 0 0 4px 0;
            font-size: 20px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.87);
          }

          .section-description {
            margin: 0;
            color: rgba(0, 0, 0, 0.6);
            font-size: 14px;
          }
        }

        .section-fields {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
      }

      .form-section-panel {
        box-shadow: none;
        border: 1px solid rgba(0, 0, 0, 0.12);

        mat-expansion-panel-header {
          mat-icon {
            margin-right: 8px;
          }
        }

        .section-fields {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 16px 0;
        }
      }
    `
  ]
})
export class FormSectionComponent {
  @Input({ required: true }) set sectionConfig(value: FormSection) {
    this.sectionSignal.set(value);
  }

  @Input({ required: true }) set form(value: FormGroup) {
    this.formGroupSignal.set(value);
  }

  @Input({ required: true }) set data(value: Record<string, unknown>) {
    this.formDataSignal.set(value);
  }

  private sectionSignal = signal<FormSection | null>(null);
  private formGroupSignal = signal<FormGroup>(new FormGroup({}));
  private formDataSignal = signal<Record<string, unknown>>({});

  section = this.sectionSignal.asReadonly();
  formGroup = this.formGroupSignal.asReadonly();
  formData = this.formDataSignal.asReadonly();
}
