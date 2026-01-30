import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { dashboardReducer } from '../features/dashboard/store/dashboard.reducer';

// Root Reducer Map
// Feature reducers are registered here
export const appReducers: ActionReducerMap<AppState> = {
  dashboard: dashboardReducer
  // Future feature reducers will be added here
};
