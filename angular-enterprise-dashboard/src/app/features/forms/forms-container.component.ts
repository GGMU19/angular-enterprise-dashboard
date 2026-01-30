import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DynamicFormComponent } from './components/dynamic-form.component';
import { FormConfig } from '../../core/models/form-config.model';
import { MockFormConfigService } from '../../core/services/mock-form-config.service';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

/**
 * Forms Container Component
 *
 * Smart component that manages different form configurations.
 * Demonstrates the dynamic form system with multiple examples.
 */
@Component({
  selector: 'app-forms-container',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatSnackBarModule, DynamicFormComponent, LoaderComponent],
  template: `
    <div class="forms-container">
      <div class="page-header">
        <h1>Dynamic Forms</h1>
        <p>
          Experience our powerful dynamic form rendering engine with complex validation and
          conditional logic.
        </p>
      </div>

      @if (loading()) {
        <app-loader message="Loading form configurations..." size="large"></app-loader>
      } @else {
        <mat-tab-group animationDuration="300ms" class="forms-tabs">
          <mat-tab label="User Registration">
            <div class="tab-content">
              @if (registrationForm()) {
                <app-dynamic-form
                  [formConfig]="registrationForm()!"
                  (formSubmit)="onFormSubmit($event, 'registration')"
                  (formCancel)="onFormCancel()"
                  (saveProgress)="onSaveProgress($event, 'registration')"
                ></app-dynamic-form>
              }
            </div>
          </mat-tab>

          <mat-tab label="Project Creation">
            <div class="tab-content">
              @if (projectForm()) {
                <app-dynamic-form
                  [formConfig]="projectForm()!"
                  (formSubmit)="onFormSubmit($event, 'project')"
                  (formCancel)="onFormCancel()"
                  (saveProgress)="onSaveProgress($event, 'project')"
                ></app-dynamic-form>
              }
            </div>
          </mat-tab>
        </mat-tab-group>
      }
    </div>
  `,
  styles: [
    `
      .forms-container {
        min-height: calc(100vh - 64px);
        background-color: #fafafa;
        padding: 32px;
      }

      .page-header {
        max-width: 900px;
        margin: 0 auto 32px;
        text-align: center;

        h1 {
          margin: 0 0 8px 0;
          font-size: 32px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.87);
        }

        p {
          margin: 0;
          color: rgba(0, 0, 0, 0.6);
          font-size: 16px;
        }
      }

      .forms-tabs {
        max-width: 900px;
        margin: 0 auto;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;

        .tab-content {
          padding: 24px;
        }
      }

      @media (max-width: 768px) {
        .forms-container {
          padding: 16px;
        }

        .page-header {
          margin-bottom: 24px;

          h1 {
            font-size: 24px;
          }

          p {
            font-size: 14px;
          }
        }

        .forms-tabs .tab-content {
          padding: 16px;
        }
      }
    `
  ]
})
export class FormsContainerComponent implements OnInit {
  private formConfigService = inject(MockFormConfigService);
  private snackBar = inject(MatSnackBar);

  loading = signal(true);
  registrationForm = signal<FormConfig | null>(null);
  projectForm = signal<FormConfig | null>(null);

  ngOnInit(): void {
    this.loadFormConfigurations();
  }

  private loadFormConfigurations(): void {
    this.loading.set(true);

    // Load registration form
    this.formConfigService.getUserRegistrationForm().subscribe((config: FormConfig) => {
      this.registrationForm.set(config);
    });

    // Load project form
    this.formConfigService.getProjectCreationForm().subscribe((config: FormConfig) => {
      this.projectForm.set(config);
      this.loading.set(false);
    });
  }

  onFormSubmit(data: Record<string, unknown>, formType: string): void {
    console.log(`${formType} form submitted:`, data);

    // Simulate API submission
    this.formConfigService
      .submitForm(formType, data)
      .subscribe((response: { success: boolean; message: string }) => {
        this.snackBar.open(response.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      });
  }

  onFormCancel(): void {
    this.snackBar.open('Form cancelled', 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  onSaveProgress(data: Record<string, unknown>, formType: string): void {
    // Save to localStorage
    localStorage.setItem(
      `form-progress-${formType}`,
      JSON.stringify({
        data,
        timestamp: new Date().toISOString()
      })
    );

    this.snackBar.open('Progress saved!', 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }
}
