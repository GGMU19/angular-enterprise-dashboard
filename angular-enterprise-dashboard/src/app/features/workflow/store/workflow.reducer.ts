import { createReducer, on } from '@ngrx/store';
import { WorkflowActions } from './workflow.actions';
import { WorkflowState, initialWorkflowState } from './workflow.state';

/**
 * Workflow Reducer
 *
 * Handles state updates for workflow/wizard.
 */
export const workflowReducer = createReducer(
  initialWorkflowState,

  on(
    WorkflowActions.nextStep,
    (state): WorkflowState => ({
      ...state,
      currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1)
    })
  ),

  on(
    WorkflowActions.previousStep,
    (state): WorkflowState => ({
      ...state,
      currentStep: Math.max(state.currentStep - 1, 0)
    })
  ),

  on(
    WorkflowActions.goToStep,
    (state, { step }): WorkflowState => ({
      ...state,
      currentStep: Math.max(0, Math.min(step, state.totalSteps - 1))
    })
  ),

  on(
    WorkflowActions.updateWizardData,
    (state, { data }): WorkflowState => ({
      ...state,
      wizardData: {
        ...state.wizardData,
        ...data
      }
    })
  ),

  on(
    WorkflowActions.submitWizard,
    (state): WorkflowState => ({
      ...state,
      isSubmitting: true,
      error: null
    })
  ),

  on(
    WorkflowActions.submitSuccess,
    (state): WorkflowState => ({
      ...state,
      isSubmitting: false,
      submitSuccess: true,
      error: null
    })
  ),

  on(
    WorkflowActions.submitFailure,
    (state, { error }): WorkflowState => ({
      ...state,
      isSubmitting: false,
      submitSuccess: false,
      error
    })
  ),

  on(WorkflowActions.resetWizard, (): WorkflowState => initialWorkflowState)
);
