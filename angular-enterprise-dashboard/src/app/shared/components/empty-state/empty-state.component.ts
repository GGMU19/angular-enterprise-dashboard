import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

/**
 * Empty State Component
 *
 * Reusable component for displaying empty states with custom icon and message.
 * Uses OnPush change detection for optimal performance.
 */
@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="empty-state">
      <mat-icon class="empty-icon">{{ icon }}</mat-icon>

      @if (title) {
        <h2 class="empty-title">{{ title }}</h2>
      }

      <p class="empty-message">{{ message }}</p>

      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 16px;
        padding: 48px 24px;
        color: rgba(0, 0, 0, 0.38);
      }

      .empty-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        opacity: 0.5;
      }

      .empty-title {
        margin: 0;
        font-size: 24px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.6);
      }

      .empty-message {
        margin: 0;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.5);
        max-width: 400px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyStateComponent {
  @Input() icon = 'inbox';
  @Input() title?: string;
  @Input({ required: true }) message!: string;
}
