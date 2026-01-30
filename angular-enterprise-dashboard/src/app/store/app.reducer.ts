import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { dashboardReducer } from '../features/dashboard/store/dashboard.reducer';
import { workflowReducer } from '../features/workflow/store/workflow.reducer';

// Root Reducer Map
// Feature reducers are registered here
export const appReducers: ActionReducerMap<AppState> = {
  dashboard: dashboardReducer,
  workflow: workflowReducer
  // Future feature reducers will be added here
};
