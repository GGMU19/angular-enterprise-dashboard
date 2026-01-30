import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { selectWizardData } from '../store/workflow.selectors';

/**
 * Wizard Step 3: Review
 *
 * Shows a summary of all entered data for review before submission.
 */
@Component({
  selector: 'app-wizard-review',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule, MatDividerModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Review & Submit</mat-card-title>
        <mat-card-subtitle>Please review your project information</mat-card-subtitle>
      </mat-card-header>

      <mat-card-content>
        <div class="review-section">
          <h3>
            <mat-icon>settings</mat-icon>
            Project Setup
          </h3>
          <mat-list>
            <mat-list-item>
              <span matListItemTitle>Project Name</span>
              <span matListItemLine>{{ wizardData()?.projectName || 'Not provided' }}</span>
            </mat-list-item>
            <mat-list-item>
              <span matListItemTitle>Project Type</span>
              <span matListItemLine>{{ formatProjectType(wizardData()?.projectType) }}</span>
            </mat-list-item>
            <mat-list-item>
              <span matListItemTitle>Priority</span>
              <span matListItemLine [class]="'priority-' + wizardData()?.priority">
                {{ formatPriority(wizardData()?.priority) }}
              </span>
            </mat-list-item>
          </mat-list>
        </div>

        <mat-divider></mat-divider>

        <div class="review-section">
          <h3>
            <mat-icon>description</mat-icon>
            Project Details
          </h3>
          <mat-list>
            <mat-list-item>
              <span matListItemTitle>Description</span>
              <span matListItemLine>{{ wizardData()?.description || 'Not provided' }}</span>
            </mat-list-item>
            <mat-list-item>
              <span matListItemTitle>Start Date</span>
              <span matListItemLine>{{ formatDate(wizardData()?.startDate) }}</span>
            </mat-list-item>
            <mat-list-item>
              <span matListItemTitle>End Date</span>
              <span matListItemLine>{{ formatDate(wizardData()?.endDate) }}</span>
            </mat-list-item>
            <mat-list-item>
              <span matListItemTitle>Team Size</span>
              <span matListItemLine>{{ wizardData()?.teamSize || 'Not provided' }} members</span>
            </mat-list-item>
            <mat-list-item>
              <span matListItemTitle>Budget</span>
              <span matListItemLine>
                {{
                  wizardData()?.budget ? '$' + formatNumber(wizardData()?.budget) : 'Not provided'
                }}
              </span>
            </mat-list-item>
          </mat-list>
        </div>

        <div class="review-note">
          <mat-icon>info</mat-icon>
          <p>
            Please review all information carefully before submitting. Click "Submit" to create your
            project.
          </p>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .review-section {
        margin: 1.5rem 0;

        h3 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #1976d2;
          margin-bottom: 1rem;

          mat-icon {
            font-size: 20px;
            width: 20px;
            height: 20px;
          }
        }

        mat-list-item {
          margin-bottom: 0.5rem;

          [matListItemTitle] {
            font-weight: 500;
            color: #666;
            font-size: 0.875rem;
          }

          [matListItemLine] {
            font-size: 1rem;
            color: #000;
          }

          .priority-low {
            color: #4caf50;
          }

          .priority-medium {
            color: #ff9800;
          }

          .priority-high {
            color: #f44336;
          }
        }
      }

      mat-divider {
        margin: 1.5rem 0;
      }

      .review-note {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1rem;
        background-color: #e3f2fd;
        border-radius: 4px;
        margin-top: 2rem;

        mat-icon {
          color: #1976d2;
          flex-shrink: 0;
        }

        p {
          margin: 0;
          color: #1565c0;
        }
      }
    `
  ]
})
export class WizardReviewComponent {
  private store = inject(Store);

  wizardData = toSignal(this.store.select(selectWizardData));

  formatProjectType(type: string | undefined): string {
    const types: Record<string, string> = {
      web: 'Web Application',
      mobile: 'Mobile App',
      desktop: 'Desktop Application',
      api: 'API/Backend'
    };
    return types[type || ''] || 'Not provided';
  }

  formatPriority(priority: string | undefined): string {
    return priority ? priority.charAt(0).toUpperCase() + priority.slice(1) : 'Not provided';
  }

  formatDate(date: Date | null | undefined): string {
    if (!date) return 'Not provided';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatNumber(num: number | null | undefined): string {
    if (num === null || num === undefined) return '0';
    return num.toLocaleString('en-US');
  }
}
