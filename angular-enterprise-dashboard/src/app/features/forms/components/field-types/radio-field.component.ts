import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { BaseFieldComponent } from './base-field.component';

@Component({
  selector: 'app-radio-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatRadioModule],
  template: `
    <div class="radio-group-container">
      <div class="group-label">{{ field().label }}</div>
      <mat-radio-group [formControl]="control()">
        @for (option of field().options; track option.value) {
          <mat-radio-button [value]="option.value" [disabled]="option.disabled || false">
            {{ option.label }}
          </mat-radio-button>
        }
      </mat-radio-group>
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
      .radio-group-container {
        margin-bottom: 16px;
      }
      .group-label {
        font-weight: 500;
        margin-bottom: 8px;
        color: rgba(0, 0, 0, 0.87);
      }
      mat-radio-group {
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
export class RadioFieldComponent extends BaseFieldComponent {}
