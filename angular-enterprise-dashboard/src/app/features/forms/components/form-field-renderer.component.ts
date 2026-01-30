import { Component, Input, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { FormFieldConfig } from '../../../core/models/form-config.model';
import { FormBuilderService } from '../../../core/services/form-builder.service';
import {
  TextFieldComponent,
  EmailFieldComponent,
  PasswordFieldComponent,
  NumberFieldComponent,
  TextareaFieldComponent,
  SelectFieldComponent,
  RadioFieldComponent,
  CheckboxFieldComponent,
  CheckboxGroupFieldComponent,
  DateFieldComponent,
  ToggleFieldComponent
} from './field-types';

/**
 * Form Field Renderer Component
 *
 * Dynamically renders form fields based on field configuration.
 * Routes to appropriate field type component.
 */
@Component({
  selector: 'app-form-field-renderer',
  standalone: true,
  imports: [
    CommonModule,
    TextFieldComponent,
    EmailFieldComponent,
    PasswordFieldComponent,
    NumberFieldComponent,
    TextareaFieldComponent,
    SelectFieldComponent,
    RadioFieldComponent,
    CheckboxFieldComponent,
    CheckboxGroupFieldComponent,
    DateFieldComponent,
    ToggleFieldComponent
  ],
  template: `
    @if (isVisible()) {
      <div class="form-field" [class]="field().cssClass" [style.--cols]="field().cols || 12">
        @switch (field().type) {
          @case ('text') {
            <app-text-field [fieldConfig]="field()" [form]="formGroup()" [data]="formData()" />
          }
          @case ('email') {
            <app-email-field [fieldConfig]="field()" [form]="formGroup()" [data]="formData()" />
          }
          @case ('password') {
            <app-password-field [fieldConfig]="field()" [form]="formGroup()" [data]="formData()" />
          }
          @case ('number') {
            <app-number-field [fieldConfig]="field()" [form]="formGroup()" [data]="formData()" />
          }
          @case ('textarea') {
            <app-textarea-field [fieldConfig]="field()" [form]="formGroup()" [data]="formData()" />
          }
          @case ('select') {
            <app-select-field [fieldConfig]="field()" [form]="formGroup()" [data]="formData()" />
          }
          @case ('radio') {
            <app-radio-field [fieldConfig]="field()" [form]="formGroup()" [data]="formData()" />
          }
          @case ('checkbox') {
            <app-checkbox-field [fieldConfig]="field()" [form]="formGroup()" [data]="formData()" />
          }
          @case ('checkbox-group') {
            <app-checkbox-group-field
              [fieldConfig]="field()"
              [form]="formGroup()"
              [data]="formData()"
            />
          }
          @case ('date') {
            <app-date-field [fieldConfig]="field()" [form]="formGroup()" [data]="formData()" />
          }
          @case ('toggle') {
            <app-toggle-field [fieldConfig]="field()" [form]="formGroup()" [data]="formData()" />
          }
        }
      </div>
    }
  `,
  styles: [
    `
      .form-field {
        width: 100%;
      }
    `
  ]
})
export class FormFieldRendererComponent {
  private formBuilderService = inject(FormBuilderService);

  @Input({ required: true }) set fieldConfig(value: FormFieldConfig) {
    this.fieldSignal.set(value);
  }

  @Input({ required: true }) set form(value: FormGroup) {
    this.formGroupSignal.set(value);
  }

  @Input({ required: true }) set data(value: Record<string, unknown>) {
    this.formDataSignal.set(value);
  }

  private fieldSignal = signal<FormFieldConfig>({} as FormFieldConfig);
  private formGroupSignal = signal<FormGroup>(new FormGroup({}));
  private formDataSignal = signal<Record<string, unknown>>({});

  field = this.fieldSignal.asReadonly();
  formGroup = this.formGroupSignal.asReadonly();
  formData = this.formDataSignal.asReadonly();

  isVisible = computed(() => {
    const f = this.fieldSignal();
    const data = this.formDataSignal();
    return this.formBuilderService.shouldDisplayField(f, data);
  });
}
