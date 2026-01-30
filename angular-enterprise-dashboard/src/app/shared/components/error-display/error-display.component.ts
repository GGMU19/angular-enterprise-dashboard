import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Error Display Component
 *
 * Reusable error display with icon, message, and retry action.
 * Uses OnPush change detection for optimal performance.
 */
@Component({
  selector: 'app-error-display',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div class="error-display" [class]="'variant-' + variant">
      <mat-icon class="error-icon" [class]="'icon-' + variant">
        {{ getIcon() }}
      </mat-icon>

      @if (title) {
        <h2 class="error-title">{{ title }}</h2>
      }

      <p class="error-message">{{ message }}</p>

      @if (showRetry) {
        <button mat-raised-button [color]="buttonColor" (click)="retry.emit()">
          <mat-icon>refresh</mat-icon>
          {{ retryLabel }}
        </button>
      }
    </div>
  `,
  styles: [
    `
      .error-display {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 16px;
        padding: 48px 24px;
      }

      .error-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
      }

      .icon-error {
        color: #f44336;
      }

      .icon-warning {
        color: #ff9800;
      }

      .icon-info {
        color: #2196f3;
      }

      .error-title {
        margin: 0;
        font-size: 24px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.87);
      }

      .error-message {
        margin: 0;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.6);
        max-width: 500px;
      }

      .variant-error .error-message {
        color: #d32f2f;
      }

      button {
        margin-top: 8px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorDisplayComponent {
  @Input() title?: string;
  @Input({ required: true }) message!: string;
  @Input() variant: 'error' | 'warning' | 'info' = 'error';
  @Input() showRetry = true;
  @Input() retryLabel = 'Retry';
  @Input() buttonColor: 'primary' | 'accent' | 'warn' = 'primary';

  @Output() retry = new EventEmitter<void>();

  getIcon(): string {
    const icons = {
      error: 'error_outline',
      warning: 'warning_amber',
      info: 'info_outline'
    };
    return icons[this.variant];
  }
}
