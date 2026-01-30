import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.state';
import { ProjectStatus, Project } from '../../../core/models';

// Feature Selector
export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');

// Base Selectors (direct state access)
export const selectAllProjects = createSelector(selectDashboardState, state => state.projects);

export const selectRecentActivities = createSelector(
  selectDashboardState,
  state => state.recentActivities
);

export const selectDashboardStats = createSelector(selectDashboardState, state => state.stats);

export const selectSelectedProjectId = createSelector(
  selectDashboardState,
  state => state.selectedProjectId
);

export const selectDashboardLoading = createSelector(selectDashboardState, state => state.loading);

export const selectDashboardError = createSelector(selectDashboardState, state => state.error);

export const selectLastUpdated = createSelector(selectDashboardState, state => state.lastUpdated);

// Derived Selectors (computed/filtered data)

// Get selected project
export const selectSelectedProject = createSelector(
  selectAllProjects,
  selectSelectedProjectId,
  (projects, selectedId) => projects.find(p => p.id === selectedId) || null
);

// Filter projects by status
export const selectProjectsByStatus = (
  status: ProjectStatus
): MemoizedSelector<object, Project[]> =>
  createSelector(selectAllProjects, (projects: Project[]): Project[] =>
    projects.filter(p => p.status === status)
  );

// Get active projects
export const selectActiveProjects = createSelector(selectAllProjects, projects =>
  projects.filter(p => p.status === 'active')
);

// Get completed projects
export const selectCompletedProjects = createSelector(selectAllProjects, projects =>
  projects.filter(p => p.status === 'completed')
);

// Get on-hold projects
export const selectOnHoldProjects = createSelector(selectAllProjects, projects =>
  projects.filter(p => p.status === 'on-hold')
);

// Get projects by priority
export const selectHighPriorityProjects = createSelector(selectAllProjects, projects =>
  projects.filter(p => p.priority === 'high' || p.priority === 'critical')
);

// Get overdue projects (end date passed, not completed)
export const selectOverdueProjects = createSelector(selectAllProjects, projects => {
  const now = new Date().toISOString();
  return projects.filter(p => p.endDate < now && p.status !== 'completed');
});

// Calculate total project count
export const selectTotalProjectCount = createSelector(
  selectAllProjects,
  projects => projects.length
);

// Calculate average progress across all projects
export const selectAverageProgress = createSelector(selectAllProjects, projects => {
  if (projects.length === 0) return 0;
  const totalProgress = projects.reduce((sum, p) => sum + p.progress, 0);
  return Math.round(totalProgress / projects.length);
});

// Check if dashboard has data
export const selectHasDashboardData = createSelector(
  selectAllProjects,
  projects => projects.length > 0
);

// Combined loading/error state for UI
export const selectDashboardUIState = createSelector(
  selectDashboardLoading,
  selectDashboardError,
  selectHasDashboardData,
  (loading, error, hasData) => ({
    loading,
    error,
    hasData,
    isEmpty: !loading && !error && !hasData
  })
);

// Get recent activities (last 10)
export const selectRecentActivitiesLimited = createSelector(selectRecentActivities, activities =>
  activities.slice(0, 10)
);

// Sort projects by update date (most recent first)
export const selectProjectsSortedByUpdate = createSelector(selectAllProjects, projects =>
  [...projects].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
);

// Get projects with budget issues (spent > budget)
export const selectOverBudgetProjects = createSelector(selectAllProjects, projects =>
  projects.filter(p => p.spent > p.budget)
);
