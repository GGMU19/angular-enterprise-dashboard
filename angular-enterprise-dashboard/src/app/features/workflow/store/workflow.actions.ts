import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProjectWizardData } from '../../../core/models/workflow.model';

/**
 * Workflow Actions
 *
 * Actions for managing workflow/wizard state.
 */
export const WorkflowActions = createActionGroup({
  source: 'Workflow',
  events: {
    'Next Step': emptyProps(),
    'Previous Step': emptyProps(),
    'Go To Step': props<{ step: number }>(),
    'Update Wizard Data': props<{ data: Partial<ProjectWizardData> }>(),
    'Submit Wizard': emptyProps(),
    'Submit Success': emptyProps(),
    'Submit Failure': props<{ error: string }>(),
    'Reset Wizard': emptyProps()
  }
});
