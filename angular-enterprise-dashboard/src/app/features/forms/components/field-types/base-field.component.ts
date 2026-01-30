import { Directive, Input, signal, computed, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormFieldConfig } from '../../../../core/models/form-config.model';
import { FormBuilderService } from '../../../../core/services/form-builder.service';
import { FormValidatorService } from '../../../../core/services/form-validator.service';

/**
 * Base Field Component
 *
 * Provides common functionality for all field type components.
 */
@Directive()
export abstract class BaseFieldComponent {
  protected formBuilderService = inject(FormBuilderService);
  protected validatorService = inject(FormValidatorService);

  private fieldSignal = signal<FormFieldConfig>({} as FormFieldConfig);
  private formGroupSignal = signal<FormGroup>(new FormGroup({}));
  private formDataSignal = signal<Record<string, unknown>>({});

  @Input({ required: true }) set fieldConfig(value: FormFieldConfig) {
    this.fieldSignal.set(value);
  }

  @Input({ required: true }) set form(value: FormGroup) {
    this.formGroupSignal.set(value);
  }

  @Input({ required: true }) set data(value: Record<string, unknown>) {
    this.formDataSignal.set(value);
  }

  field = this.fieldSignal.asReadonly();
  formGroup = this.formGroupSignal.asReadonly();
  formData = this.formDataSignal.asReadonly();

  control = computed(() => {
    const fg = this.formGroupSignal();
    const f = this.fieldSignal();
    return fg.get(f.name) as FormControl;
  });

  hasError = computed(() => {
    const ctrl = this.control();
    return this.validatorService.hasErrors(ctrl);
  });

  errorMessage = computed(() => {
    const ctrl = this.control();
    return this.validatorService.getFirstError(ctrl) || '';
  });
}
