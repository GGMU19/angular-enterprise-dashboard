// Form Field Types
export type FormFieldType =
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'checkbox-group'
  | 'date'
  | 'time'
  | 'datetime'
  | 'file'
  | 'toggle';

// Validation Rule Types
export type ValidationType =
  | 'required'
  | 'email'
  | 'minLength'
  | 'maxLength'
  | 'min'
  | 'max'
  | 'pattern'
  | 'custom';

// Validation Rule Interface
export interface ValidationRule {
  type: ValidationType;
  value?: unknown;
  message: string;
}

// Select/Radio Option
export interface FormFieldOption {
  label: string;
  value: unknown;
  disabled?: boolean;
}

// Conditional Display Rule
export interface ConditionalRule {
  field: string; // Field name to watch
  operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan' | 'in';
  value: unknown;
}

// Form Field Configuration
export interface FormFieldConfig {
  name: string;
  label: string;
  type: FormFieldType;
  value?: unknown;
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  validators?: ValidationRule[];
  options?: FormFieldOption[]; // For select, radio, checkbox-group
  multiple?: boolean; // For select
  rows?: number; // For textarea
  accept?: string; // For file input
  min?: number | string; // For number, date
  max?: number | string; // For number, date
  step?: number; // For number
  conditionalDisplay?: ConditionalRule; // Show/hide based on other fields
  cols?: number; // Grid column span (1-12)
  order?: number; // Display order
  cssClass?: string; // Custom CSS class
}

// Form Section (Group of fields)
export interface FormSection {
  title: string;
  description?: string;
  fields: FormFieldConfig[];
  collapsible?: boolean;
  collapsed?: boolean;
  order?: number;
}

// Complete Form Configuration
export interface FormConfig {
  id: string;
  name: string;
  title: string;
  description?: string;
  sections: FormSection[];
  submitButtonText?: string;
  cancelButtonText?: string;
  showProgressBar?: boolean;
  allowSaveProgress?: boolean;
  layout?: 'vertical' | 'horizontal' | 'grid';
}

// Form Submission Data
export interface FormSubmission {
  formId: string;
  data: Record<string, unknown>;
  timestamp: string;
  userId?: string;
}

// Form Validation Error
export interface FormValidationError {
  field: string;
  message: string;
  type: ValidationType;
}

// Form State for persistence
export interface FormProgress {
  formId: string;
  data: Record<string, unknown>;
  completedSections: string[];
  lastUpdated: string;
}
