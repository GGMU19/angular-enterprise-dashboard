import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Activity } from '../../../../core/models/activity.model';

/**
 * Activity Feed Presentation Component
 *
 * Displays recent activity timeline with Material List component.
 * Pure presentation component - receives all data via @Input.
 */
@Component({
  selector: 'app-activity-feed',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule, MatDividerModule],
  template: `
    <mat-card class="activity-card">
      <mat-card-header>
        <mat-card-title>
          <mat-icon>timeline</mat-icon>
          Recent Activity
        </mat-card-title>
      </mat-card-header>

      <mat-card-content>
        @if (activities && activities.length > 0) {
          <mat-list>
            @for (activity of activities; track activity.id) {
              <mat-list-item>
                <mat-icon matListItemIcon [class]="'activity-icon-' + activity.type">
                  {{ getActivityIcon(activity.type) }}
                </mat-icon>
                <div matListItemTitle>{{ activity.projectName }}</div>
                <div matListItemLine>
                  <span class="activity-description">{{ activity.description }}</span>
                </div>
                <div matListItemLine class="activity-meta">
                  <span class="activity-user">
                    <mat-icon class="small-icon">person</mat-icon>
                    {{ activity.user }}
                  </span>
                  <span class="activity-time">
                    <mat-icon class="small-icon">schedule</mat-icon>
                    {{ activity.timestamp | date: 'short' }}
                  </span>
                </div>
              </mat-list-item>
              @if (!$last) {
                <mat-divider></mat-divider>
              }
            }
          </mat-list>
        } @else {
          <div class="empty-state">
            <mat-icon>inbox</mat-icon>
            <p>No recent activity</p>
          </div>
        }
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .activity-card {
        height: 100%;
      }

      mat-card-header {
        margin-bottom: 8px;
      }

      mat-card-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 20px;
      }

      mat-card-title mat-icon {
        color: #1976d2;
      }

      mat-list {
        padding: 0;
      }

      mat-list-item {
        height: auto !important;
        min-height: 72px;
        padding: 12px 0;
      }

      mat-icon[matListItemIcon] {
        width: 40px;
        height: 40px;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        margin-right: 16px;
      }

      .activity-icon-created {
        background-color: #e3f2fd;
        color: #1976d2;
      }

      .activity-icon-updated {
        background-color: #fff3e0;
        color: #f57c00;
      }

      .activity-icon-completed {
        background-color: #e8f5e9;
        color: #4caf50;
      }

      .activity-icon-deleted {
        background-color: #ffebee;
        color: #f44336;
      }

      .activity-icon-status_changed {
        background-color: #f3e5f5;
        color: #9c27b0;
      }

      .activity-description {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.87);
      }

      .activity-meta {
        display: flex;
        gap: 16px;
        margin-top: 4px;
      }

      .activity-user,
      .activity-time {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.54);
      }

      .small-icon {
        font-size: 14px;
        width: 14px;
        height: 14px;
      }

      mat-divider {
        margin: 0;
      }

      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 48px 24px;
        color: rgba(0, 0, 0, 0.38);
      }

      .empty-state mat-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        margin-bottom: 16px;
      }

      .empty-state p {
        margin: 0;
        font-size: 16px;
      }
    `
  ]
})
export class ActivityFeedComponent {
  @Input({ required: true }) activities: Activity[] = [];

  getActivityIcon(type: string): string {
    const icons: Record<string, string> = {
      created: 'add_circle',
      updated: 'edit',
      completed: 'check_circle',
      deleted: 'delete',
      status_changed: 'swap_horiz'
    };
    return icons[type] || 'info';
  }
}
