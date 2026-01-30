import { createReducer, on } from '@ngrx/store';
import { DashboardActions } from './dashboard.actions';
import { initialDashboardState } from './dashboard.state';

export const dashboardReducer = createReducer(
  initialDashboardState,

  // Load Projects
  on(DashboardActions.loadProjects, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DashboardActions.loadProjectsSuccess, (state, { projects }) => ({
    ...state,
    projects,
    loading: false,
    lastUpdated: new Date().toISOString()
  })),
  on(DashboardActions.loadProjectsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load Stats
  on(DashboardActions.loadStats, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DashboardActions.loadStatsSuccess, (state, { stats }) => ({
    ...state,
    stats,
    loading: false
  })),
  on(DashboardActions.loadStatsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load Activities
  on(DashboardActions.loadActivities, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DashboardActions.loadActivitiesSuccess, (state, { activities }) => ({
    ...state,
    recentActivities: activities,
    loading: false
  })),
  on(DashboardActions.loadActivitiesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load All Dashboard Data
  on(DashboardActions.loadDashboardData, state => ({
    ...state,
    loading: true,
    error: null
  })),

  // Project Selection
  on(DashboardActions.selectProject, (state, { projectId }) => ({
    ...state,
    selectedProjectId: projectId
  })),
  on(DashboardActions.clearSelection, state => ({
    ...state,
    selectedProjectId: null
  })),

  // Create Project
  on(DashboardActions.createProject, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DashboardActions.createProjectSuccess, (state, { project }) => ({
    ...state,
    projects: [...state.projects, project],
    loading: false
  })),
  on(DashboardActions.createProjectFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update Project
  on(DashboardActions.updateProject, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DashboardActions.updateProjectSuccess, (state, { project }) => ({
    ...state,
    projects: state.projects.map(p => (p.id === project.id ? { ...p, ...project } : p)),
    loading: false
  })),
  on(DashboardActions.updateProjectFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete Project
  on(DashboardActions.deleteProject, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DashboardActions.deleteProjectSuccess, (state, { projectId }) => ({
    ...state,
    projects: state.projects.filter(p => p.id !== projectId),
    selectedProjectId: state.selectedProjectId === projectId ? null : state.selectedProjectId,
    loading: false
  })),
  on(DashboardActions.deleteProjectFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Clear Error
  on(DashboardActions.clearError, state => ({
    ...state,
    error: null
  }))
);
