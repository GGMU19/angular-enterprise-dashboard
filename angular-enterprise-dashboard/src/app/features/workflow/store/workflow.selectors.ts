import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkflowState } from './workflow.state';

/**
 * Workflow Selectors
 *
 * Selectors for accessing workflow state.
 */
export const selectWorkflowState = createFeatureSelector<WorkflowState>('workflow');

export const selectCurrentStep = createSelector(selectWorkflowState, state => state.currentStep);

export const selectTotalSteps = createSelector(selectWorkflowState, state => state.totalSteps);

export const selectWizardData = createSelector(selectWorkflowState, state => state.wizardData);

export const selectIsSubmitting = createSelector(selectWorkflowState, state => state.isSubmitting);

export const selectSubmitSuccess = createSelector(
  selectWorkflowState,
  state => state.submitSuccess
);

export const selectError = createSelector(selectWorkflowState, state => state.error);

export const selectIsFirstStep = createSelector(
  selectCurrentStep,
  currentStep => currentStep === 0
);

export const selectIsLastStep = createSelector(
  selectCurrentStep,
  selectTotalSteps,
  (currentStep, totalSteps) => currentStep === totalSteps - 1
);

export const selectStepProgress = createSelector(
  selectCurrentStep,
  selectTotalSteps,
  (currentStep, totalSteps) => ((currentStep + 1) / totalSteps) * 100
);
