import { DashboardState } from '../features/dashboard/store/dashboard.state';

// Root State Interface
// Each feature will add its own state slice here
export interface AppState {
  dashboard: DashboardState;
  // Future features will be added here:
  // forms: FormsState;
  // workflow: WorkflowState;
}
