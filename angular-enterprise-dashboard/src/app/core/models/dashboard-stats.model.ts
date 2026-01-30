import { ProjectStatus } from './project.model';

// Dashboard Statistics Interface
export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  onHoldProjects: number;
  totalBudget: number;
  totalSpent: number;
  averageProgress: number;
}

// Status count for charts/badges
export interface StatusCount {
  status: ProjectStatus;
  count: number;
  percentage: number;
}
