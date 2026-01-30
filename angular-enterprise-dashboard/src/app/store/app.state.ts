import { DashboardState } from '../features/dashboard/store/dashboard.state';
import { WorkflowState } from '../features/workflow/store/workflow.state';

// Root State Interface
// Each feature will add its own state slice here
export interface AppState {
  dashboard: DashboardState;
  workflow: WorkflowState;
  // Future features will be added here:
  // forms: FormsState;
}
