import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BaseFieldComponent } from './base-field.component';

@Component({
  selector: 'app-toggle-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSlideToggleModule],
  template: `
    <div class="toggle-container">
      <mat-slide-toggle [formControl]="control()">
        {{ field().label }}
      </mat-slide-toggle>
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
      .toggle-container {
        margin-bottom: 16px;
      }
      .field-hint {
        margin-top: 4px;
        margin-left: 52px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);
      }
      .field-error {
        margin-top: 4px;
        margin-left: 52px;
        font-size: 12px;
        color: #f44336;
      }
    `
  ]
})
export class ToggleFieldComponent extends BaseFieldComponent {}
