import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Project, Activity, DashboardStats } from '../../../core/models';

// Dashboard Action Group
// Modern NgRx approach: groups related actions together
export const DashboardActions = createActionGroup({
  source: 'Dashboard',
  events: {
    // Load Projects
    'Load Projects': emptyProps(),
    'Load Projects Success': props<{ projects: Project[] }>(),
    'Load Projects Failure': props<{ error: string }>(),

    // Load Statistics
    'Load Stats': emptyProps(),
    'Load Stats Success': props<{ stats: DashboardStats }>(),
    'Load Stats Failure': props<{ error: string }>(),

    // Load Recent Activities
    'Load Activities': emptyProps(),
    'Load Activities Success': props<{ activities: Activity[] }>(),
    'Load Activities Failure': props<{ error: string }>(),

    // Load All Dashboard Data (convenience action)
    'Load Dashboard Data': emptyProps(),

    // Project Selection
    'Select Project': props<{ projectId: string }>(),
    'Clear Selection': emptyProps(),

    // Project CRUD Operations
    'Create Project': props<{ project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'> }>(),
    'Create Project Success': props<{ project: Project }>(),
    'Create Project Failure': props<{ error: string }>(),

    'Update Project': props<{ project: Partial<Project> & Pick<Project, 'id'> }>(),
    'Update Project Success': props<{ project: Project }>(),
    'Update Project Failure': props<{ error: string }>(),

    'Delete Project': props<{ projectId: string }>(),
    'Delete Project Success': props<{ projectId: string }>(),
    'Delete Project Failure': props<{ error: string }>(),

    // Clear Error
    'Clear Error': emptyProps()
  }
});
