import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BaseFieldComponent } from './base-field.component';

@Component({
  selector: 'app-checkbox-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule],
  template: `
    <div class="checkbox-container">
      <mat-checkbox [formControl]="control()">
        {{ field().label }}
      </mat-checkbox>
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
      .checkbox-container {
        margin-bottom: 16px;
      }
      .field-hint {
        margin-top: 4px;
        margin-left: 32px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);
      }
      .field-error {
        margin-top: 4px;
        margin-left: 32px;
        font-size: 12px;
        color: #f44336;
      }
    `
  ]
})
export class CheckboxFieldComponent extends BaseFieldComponent {}
