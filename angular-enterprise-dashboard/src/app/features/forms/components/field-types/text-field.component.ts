import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseFieldComponent } from './base-field.component';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>{{ field().label }}</mat-label>
      <input
        matInput
        [formControl]="control()"
        [placeholder]="field().placeholder || ''"
        [readonly]="field().readonly"
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
export class TextFieldComponent extends BaseFieldComponent {}
