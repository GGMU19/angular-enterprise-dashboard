import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { FormConfig, FormFieldConfig, ValidationRule } from '../models/form-config.model';

/**
 * Form Builder Service
 *
 * Dynamically builds Angular reactive forms from configuration objects.
 * Handles form group creation, validation setup, and form structure.
 */
@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {
  /**
   * Builds a FormGroup from a complete form configuration
   */
  buildForm(config: FormConfig): FormGroup {
    const formGroup: Record<string, AbstractControl> = {};

    // Process each section and its fields
    config.sections.forEach(section => {
      section.fields.forEach(field => {
        formGroup[field.name] = this.createFormControl(field);
      });
    });

    return new FormGroup(formGroup);
  }

  /**
   * Creates a FormControl for a single field with validators
   */
  createFormControl(field: FormFieldConfig): FormControl {
    const validators = this.buildValidators(field);
    const initialValue = field.value ?? this.getDefaultValue(field.type);

    return new FormControl(
      {
        value: initialValue,
        disabled: field.disabled || field.readonly || false
      },
      validators
    );
  }

  /**
   * Builds an array of validator functions from validation rules
   */
  private buildValidators(field: FormFieldConfig): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    // Required validator
    if (field.required) {
      validators.push(Validators.required);
    }

    // Process custom validation rules
    if (field.validators) {
      field.validators.forEach(rule => {
        const validator = this.createValidator(rule);
        if (validator) {
          validators.push(validator);
        }
      });
    }

    // Type-specific validators
    if (field.type === 'email') {
      validators.push(Validators.email);
    }

    // Min/Max for numbers
    if (field.type === 'number') {
      if (field.min !== undefined) {
        validators.push(Validators.min(Number(field.min)));
      }
      if (field.max !== undefined) {
        validators.push(Validators.max(Number(field.max)));
      }
    }

    return validators;
  }

  /**
   * Creates a validator function from a validation rule
   */
  private createValidator(rule: ValidationRule): ValidatorFn | null {
    switch (rule.type) {
      case 'required':
        return Validators.required;

      case 'email':
        return Validators.email;

      case 'minLength':
        return Validators.minLength(rule.value as number);

      case 'maxLength':
        return Validators.maxLength(rule.value as number);

      case 'min':
        return Validators.min(rule.value as number);

      case 'max':
        return Validators.max(rule.value as number);

      case 'pattern':
        return Validators.pattern(rule.value as string | RegExp);

      case 'custom':
        // Custom validators should be provided separately
        return null;

      default:
        return null;
    }
  }

  /**
   * Returns default value based on field type
   */
  private getDefaultValue(type: string): string | number | boolean | null | unknown[] {
    switch (type) {
      case 'checkbox':
        return false;
      case 'checkbox-group':
      case 'file':
        return [];
      case 'number':
        return null;
      case 'select':
        return null;
      default:
        return '';
    }
  }

  /**
   * Updates form values from saved data
   */
  patchFormValues(form: FormGroup, data: Record<string, unknown>): void {
    form.patchValue(data, { emitEvent: false });
  }

  /**
   * Gets all form field names from configuration
   */
  getFieldNames(config: FormConfig): string[] {
    const fields: string[] = [];
    config.sections.forEach(section => {
      section.fields.forEach(field => {
        fields.push(field.name);
      });
    });
    return fields;
  }

  /**
   * Gets a specific field configuration by name
   */
  getFieldConfig(config: FormConfig, fieldName: string): FormFieldConfig | null {
    for (const section of config.sections) {
      const field = section.fields.find(f => f.name === fieldName);
      if (field) {
        return field;
      }
    }
    return null;
  }

  /**
   * Validates if a field should be displayed based on conditional rules
   */
  shouldDisplayField(field: FormFieldConfig, formData: Record<string, unknown>): boolean {
    if (!field.conditionalDisplay) {
      return true;
    }

    const rule = field.conditionalDisplay;
    const dependentFieldValue = formData[rule.field];

    switch (rule.operator) {
      case 'equals':
        return dependentFieldValue === rule.value;
      case 'notEquals':
        return dependentFieldValue !== rule.value;
      case 'contains':
        return Array.isArray(dependentFieldValue)
          ? dependentFieldValue.includes(rule.value)
          : String(dependentFieldValue).includes(String(rule.value));
      case 'greaterThan':
        return Number(dependentFieldValue) > Number(rule.value);
      case 'lessThan':
        return Number(dependentFieldValue) < Number(rule.value);
      case 'in':
        return Array.isArray(rule.value) && rule.value.includes(dependentFieldValue);
      default:
        return true;
    }
  }

  /**
   * Gets visible fields based on conditional display rules
   */
  getVisibleFields(config: FormConfig, formData: Record<string, unknown>): FormFieldConfig[] {
    const visibleFields: FormFieldConfig[] = [];

    config.sections.forEach(section => {
      section.fields.forEach(field => {
        if (this.shouldDisplayField(field, formData)) {
          visibleFields.push(field);
        }
      });
    });

    return visibleFields;
  }

  /**
   * Resets form to initial state
   */
  resetForm(form: FormGroup, config: FormConfig): void {
    config.sections.forEach(section => {
      section.fields.forEach(field => {
        const control = form.get(field.name);
        if (control) {
          control.setValue(field.value ?? this.getDefaultValue(field.type));
          control.markAsUntouched();
          control.markAsPristine();
        }
      });
    });
  }
}
