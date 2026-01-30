import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormValidationError, ValidationType } from '../models/form-config.model';

/**
 * Form Validator Service
 *
 * Provides custom validators and validation utilities for dynamic forms.
 */
@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {
  /**
   * Custom Validators
   */

  // URL validator
  urlValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      try {
        new URL(control.value);
        return null;
      } catch {
        return { url: { message: 'Please enter a valid URL' } };
      }
    };
  }

  // Phone number validator (US format)
  phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if (!phoneRegex.test(control.value)) {
        return { phone: { message: 'Please enter a valid phone number' } };
      }

      return null;
    };
  }

  // Date range validator (from-to dates)
  dateRangeValidator(startDateField: string, endDateField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as AbstractControl;
      const startDate = formGroup.get(startDateField)?.value;
      const endDate = formGroup.get(endDateField)?.value;

      if (!startDate || !endDate) {
        return null;
      }

      if (new Date(startDate) > new Date(endDate)) {
        return {
          dateRange: {
            message: 'End date must be after start date'
          }
        };
      }

      return null;
    };
  }

  // Match fields validator (e.g., password confirmation)
  matchFieldsValidator(field1: string, field2: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as AbstractControl;
      const value1 = formGroup.get(field1)?.value;
      const value2 = formGroup.get(field2)?.value;

      if (!value1 || !value2) {
        return null;
      }

      if (value1 !== value2) {
        return {
          matchFields: {
            message: 'Fields do not match'
          }
        };
      }

      return null;
    };
  }

  // File size validator (in MB)
  fileSizeValidator(maxSizeMB: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const files = control.value as FileList | File[];
      if (!files || files.length === 0) {
        return null;
      }

      const fileArray = Array.from(files);
      const maxSizeBytes = maxSizeMB * 1024 * 1024;

      for (const file of fileArray) {
        if (file.size > maxSizeBytes) {
          return {
            fileSize: {
              message: `File size must not exceed ${maxSizeMB}MB`
            }
          };
        }
      }

      return null;
    };
  }

  // File type validator
  fileTypeValidator(allowedTypes: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const files = control.value as FileList | File[];
      if (!files || files.length === 0) {
        return null;
      }

      const fileArray = Array.from(files);

      for (const file of fileArray) {
        const fileType = file.type;
        const extension = '.' + file.name.split('.').pop()?.toLowerCase();

        const isAllowed = allowedTypes.some(
          type => fileType === type || extension === type.toLowerCase()
        );

        if (!isAllowed) {
          return {
            fileType: {
              message: `Allowed file types: ${allowedTypes.join(', ')}`
            }
          };
        }
      }

      return null;
    };
  }

  // Minimum age validator
  minAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const birthDate = new Date(control.value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < minAge) {
        return {
          minAge: {
            message: `You must be at least ${minAge} years old`
          }
        };
      }

      return null;
    };
  }

  // Credit card validator (Luhn algorithm)
  creditCardValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const cardNumber = control.value.replace(/\s/g, '');
      if (!/^\d+$/.test(cardNumber)) {
        return { creditCard: { message: 'Invalid credit card number' } };
      }

      // Luhn algorithm
      let sum = 0;
      let isEven = false;

      for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i], 10);

        if (isEven) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }

        sum += digit;
        isEven = !isEven;
      }

      if (sum % 10 !== 0) {
        return { creditCard: { message: 'Invalid credit card number' } };
      }

      return null;
    };
  }

  /**
   * Validation Error Formatting
   */

  // Get all validation errors from a form control
  getControlErrors(control: AbstractControl): FormValidationError[] {
    const errors: FormValidationError[] = [];

    if (!control.errors || !control.touched) {
      return errors;
    }

    Object.keys(control.errors).forEach(errorKey => {
      const error = control.errors![errorKey];
      const message = this.getErrorMessage(errorKey, error);

      errors.push({
        field: '', // Will be set by calling component
        message,
        type: errorKey as unknown as ValidationType
      });
    });

    return errors;
  }

  // Get user-friendly error message
  getErrorMessage(errorType: string, errorValue: unknown): string {
    const errorMessages: Record<string, (val: unknown) => string> = {
      required: () => 'This field is required',
      email: () => 'Please enter a valid email address',
      minlength: val =>
        `Minimum length is ${(val as { requiredLength: number }).requiredLength} characters`,
      maxlength: val =>
        `Maximum length is ${(val as { requiredLength: number }).requiredLength} characters`,
      min: val => `Minimum value is ${(val as { min: number }).min}`,
      max: val => `Maximum value is ${(val as { max: number }).max}`,
      pattern: () => 'Invalid format',
      url: () => 'Please enter a valid URL',
      phone: () => 'Please enter a valid phone number',
      dateRange: () => 'Invalid date range',
      matchFields: () => 'Fields do not match',
      fileSize: val => (val as { message?: string }).message || 'File size exceeds limit',
      fileType: val => (val as { message?: string }).message || 'Invalid file type',
      minAge: val => (val as { message?: string }).message || 'Age requirement not met',
      creditCard: () => 'Invalid credit card number'
    };

    const messageGenerator = errorMessages[errorType];
    if (messageGenerator) {
      return messageGenerator(errorValue);
    }

    // Default fallback
    if (typeof errorValue === 'object' && errorValue !== null && 'message' in errorValue) {
      return (errorValue as { message: string }).message;
    }

    return 'Invalid value';
  }

  // Check if form has any errors
  hasErrors(control: AbstractControl): boolean {
    return !!(control.errors && control.touched && control.invalid);
  }

  // Get first error message for a control
  getFirstError(control: AbstractControl): string | null {
    if (!control.errors || !control.touched) {
      return null;
    }

    const firstErrorKey = Object.keys(control.errors)[0];
    if (!firstErrorKey) {
      return null;
    }
    return this.getErrorMessage(firstErrorKey, control.errors[firstErrorKey]);
  }
}
