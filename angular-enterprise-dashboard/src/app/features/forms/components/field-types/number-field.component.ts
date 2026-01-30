import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseFieldComponent } from './base-field.component';

@Component({
  selector: 'app-number-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>{{ field().label }}</mat-label>
      <input
        matInput
        type="number"
        [formControl]="control()"
        [placeholder]="field().placeholder || ''"
        [readonly]="field().readonly"
        [min]="field().min || null"
        [max]="field().max || null"
        [step]="field().step || 1"
      />
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
export class NumberFieldComponent extends BaseFieldComponent {}
