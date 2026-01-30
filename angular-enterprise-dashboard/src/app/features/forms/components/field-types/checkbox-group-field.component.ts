import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BaseFieldComponent } from './base-field.component';

@Component({
  selector: 'app-checkbox-group-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule],
  template: `
    <div class="checkbox-group-container">
      <div class="group-label">{{ field().label }}</div>
      <div class="checkbox-list">
        @for (option of field().options; track option.value) {
          <mat-checkbox
            [checked]="isChecked(option.value)"
            [disabled]="option.disabled || false"
            (change)="onCheckboxChange($event, option.value)"
          >
            {{ option.label }}
          </mat-checkbox>
        }
      </div>
      @if (field().hint) {
        <div class="field-hint">{{ field().hint }}</div>
      }
      @if (hasError()) {
        <div class="field-error">{{ errorMessage() }}</div>
      }
    </div>
  `,
  styles: [
    `
      .checkbox-group-container {
        margin-bottom: 16px;
      }
      .group-label {
        font-weight: 500;
        margin-bottom: 8px;
        color: rgba(0, 0, 0, 0.87);
      }
      .checkbox-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .field-hint {
        margin-top: 4px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);
      }
      .field-error {
        margin-top: 4px;
        font-size: 12px;
        color: #f44336;
      }
    `
  ]
})
export class CheckboxGroupFieldComponent extends BaseFieldComponent {
  isChecked(value: unknown): boolean {
    const currentValue = this.control().value || [];
    return Array.isArray(currentValue) && currentValue.includes(value);
  }

  onCheckboxChange(event: { checked: boolean }, value: unknown): void {
    const currentValue = this.control().value || [];
    let newValue: unknown[];

    if (event.checked) {
      newValue = [...currentValue, value];
    } else {
      newValue = currentValue.filter((v: unknown) => v !== value);
    }

    this.control().setValue(newValue);
    this.control().markAsTouched();
  }
}
