import { Project, Activity, DashboardStats } from '../../../core/models';

// Dashboard Feature State Interface
export interface DashboardState {
  // Data
  projects: Project[];
  recentActivities: Activity[];
  stats: DashboardStats | null;

  // UI State
  selectedProjectId: string | null;
  loading: boolean;
  error: string | null;

  // Metadata
  lastUpdated: string | null;
}

// Initial State
export const initialDashboardState: DashboardState = {
  projects: [],
  recentActivities: [],
  stats: null,
  selectedProjectId: null,
  loading: false,
  error: null,
  lastUpdated: null
};
