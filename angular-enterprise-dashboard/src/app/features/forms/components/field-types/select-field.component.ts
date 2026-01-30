import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BaseFieldComponent } from './base-field.component';

@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>{{ field().label }}</mat-label>
      <mat-select [formControl]="control()" [multiple]="field().multiple || false">
        @for (option of field().options; track option.value) {
          <mat-option [value]="option.value" [disabled]="option.disabled || false">
            {{ option.label }}
          </mat-option>
        }
      </mat-select>
      @if (field().hint) {
        <mat-hint>{{ field().hint }}</mat-hint>
      }
      @if (hasError()) {
        <mat-error>{{ errorMessage() }}</mat-error>
      }
    </mat-form-field>
  `,
  styles: [
    `
      .full-width {
        width: 100%;
      }
    `
  ]
})
export class SelectFieldComponent extends BaseFieldComponent {}
