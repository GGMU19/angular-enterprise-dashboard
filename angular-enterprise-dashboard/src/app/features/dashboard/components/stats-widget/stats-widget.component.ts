import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DashboardStats } from '../../../../core/models/dashboard-stats.model';

/**
 * Stats Widget Presentation Component
 *
 * Displays dashboard statistics in Material cards with icons.
 * Pure presentation component - receives all data via @Input.
 */
@Component({
  selector: 'app-stats-widget',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    @if (stats) {
      <div class="stats-grid">
        <mat-card class="stat-card total">
          <div class="stat-icon">
            <mat-icon>folder</mat-icon>
          </div>
          <div class="stat-content">
            <span class="stat-label">Total Projects</span>
            <span class="stat-value">{{ stats.totalProjects }}</span>
          </div>
        </mat-card>

        <mat-card class="stat-card active">
          <div class="stat-icon">
            <mat-icon>play_circle</mat-icon>
          </div>
          <div class="stat-content">
            <span class="stat-label">Active</span>
            <span class="stat-value">{{ stats.activeProjects }}</span>
          </div>
        </mat-card>

        <mat-card class="stat-card completed">
          <div class="stat-icon">
            <mat-icon>check_circle</mat-icon>
          </div>
          <div class="stat-content">
            <span class="stat-label">Completed</span>
            <span class="stat-value">{{ stats.completedProjects }}</span>
          </div>
        </mat-card>

        <mat-card class="stat-card on-hold">
          <div class="stat-icon">
            <mat-icon>pause_circle</mat-icon>
          </div>
          <div class="stat-content">
            <span class="stat-label">On Hold</span>
            <span class="stat-value">{{ stats.onHoldProjects }}</span>
          </div>
        </mat-card>
      </div>
    }
  `,
  styles: [
    `
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 16px;
        margin-bottom: 24px;
      }

      .stat-card {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 20px;
        transition:
          transform 0.2s,
          box-shadow 0.2s;
      }

      .stat-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .stat-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56px;
        height: 56px;
        border-radius: 50%;
      }

      .stat-icon mat-icon {
        font-size: 32px;
        width: 32px;
        height: 32px;
      }

      .stat-card.total .stat-icon {
        background-color: #e3f2fd;
        color: #1976d2;
      }

      .stat-card.active .stat-icon {
        background-color: #e8f5e9;
        color: #4caf50;
      }

      .stat-card.completed .stat-icon {
        background-color: #f3e5f5;
        color: #9c27b0;
      }

      .stat-card.on-hold .stat-icon {
        background-color: #fff3e0;
        color: #ff9800;
      }

      .stat-content {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .stat-label {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.6);
        text-transform: uppercase;
        font-weight: 500;
        letter-spacing: 0.5px;
      }

      .stat-value {
        font-size: 32px;
        font-weight: 600;
        line-height: 1;
      }

      .stat-card.total .stat-value {
        color: #1976d2;
      }

      .stat-card.active .stat-value {
        color: #4caf50;
      }

      .stat-card.completed .stat-value {
        color: #9c27b0;
      }

      .stat-card.on-hold .stat-value {
        color: #ff9800;
      }
    `
  ]
})
export class StatsWidgetComponent {
  @Input({ required: true }) stats!: DashboardStats | null;
}
