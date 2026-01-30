import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Project } from '../../core/models/project.model';
import { DashboardActions } from './store/dashboard.actions';
import {
  selectAllProjects,
  selectDashboardStats,
  selectRecentActivitiesLimited,
  selectDashboardLoading,
  selectDashboardError,
  selectDashboardUIState,
  selectSelectedProjectId
} from './store/dashboard.selectors';
import { ProjectCardComponent, StatsWidgetComponent, ActivityFeedComponent } from './components';
import {
  LoaderComponent,
  ErrorDisplayComponent,
  EmptyStateComponent
} from '../../shared/components';

/**
 * Dashboard Container Component (Smart Component)
 *
 * Responsibilities:
 * - Connects to NgRx store
 * - Dispatches actions to load data
 * - Selects state using signals
 * - Passes data to presentation components
 * - Handles user events and dispatches corresponding actions
 *
 * This component focuses on STATE MANAGEMENT, not presentation.
 * All UI logic lives in child presentation components.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ProjectCardComponent,
    StatsWidgetComponent,
    ActivityFeedComponent,
    LoaderComponent,
    ErrorDisplayComponent,
    EmptyStateComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  // Inject Store using new inject() function (Angular 14+)
  private readonly store = inject(Store);

  selectedProjectId = toSignal(this.store.select(selectSelectedProjectId), { initialValue: null });
  // Convert observables to signals for better change detection
  // Using toSignal() from @angular/core/rxjs-interop
  projects = toSignal(this.store.select(selectAllProjects), { initialValue: [] });
  stats = toSignal(this.store.select(selectDashboardStats));
  activities = toSignal(this.store.select(selectRecentActivitiesLimited), { initialValue: [] });
  loading = toSignal(this.store.select(selectDashboardLoading), { initialValue: false });
  error = toSignal(this.store.select(selectDashboardError), { initialValue: null });
  uiState = toSignal(this.store.select(selectDashboardUIState));

  ngOnInit(): void {
    // Dispatch action to load all dashboard data on component initialization
    // This triggers the loadDashboardData$ effect which loads projects, stats, and activities
    this.store.dispatch(DashboardActions.loadDashboardData());
  }

  // Event handlers - dispatch actions in response to user interactions

  onRetry(): void {
    this.store.dispatch(DashboardActions.loadDashboardData());
  }

  onCreateProject(): void {
    // TODO: Open create project dialog/form
    // For now, just dispatch a mock create action
    console.log('Create project clicked');
  }

  onSelectProject(project: Project): void {
    this.store.dispatch(DashboardActions.selectProject({ projectId: project.id }));
  }

  onEditProject(project: Project): void {
    // TODO: Open edit project dialog/form
    console.log('Edit project:', project.id);
  }

  onDeleteProject(project: Project): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.store.dispatch(DashboardActions.deleteProject({ projectId: project.id }));
    }
  }
}
