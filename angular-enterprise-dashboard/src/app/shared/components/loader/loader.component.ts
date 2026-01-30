import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Loading Spinner Component
 *
 * Reusable loading indicator with customizable size and message.
 * Uses OnPush change detection for optimal performance.
 */
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="loader-container" [class]="'size-' + size">
      <mat-spinner [diameter]="getSpinnerSize()" [color]="color"></mat-spinner>
      @if (message) {
        <p class="loader-message">{{ message }}</p>
      }
    </div>
  `,
  styles: [
    `
      .loader-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
        padding: 24px;
      }

      .loader-container.size-small {
        padding: 12px;
        gap: 8px;
      }

      .loader-container.size-large {
        padding: 48px;
        gap: 24px;
      }

      .loader-message {
        margin: 0;
        color: rgba(0, 0, 0, 0.6);
        font-size: 14px;
        text-align: center;
      }

      .size-small .loader-message {
        font-size: 12px;
      }

      .size-large .loader-message {
        font-size: 16px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  @Input() message?: string;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';

  getSpinnerSize(): number {
    const sizes = {
      small: 32,
      medium: 50,
      large: 64
    };
    return sizes[this.size];
  }
}
