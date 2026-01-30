import { ProjectWizardData, initialProjectWizardData } from '../../../core/models/workflow.model';

/**
 * Workflow State
 *
 * Manages state for multi-step workflow/wizard.
 */
export interface WorkflowState {
  currentStep: number;
  totalSteps: number;
  wizardData: ProjectWizardData;
  isSubmitting: boolean;
  submitSuccess: boolean;
  error: string | null;
}

export const initialWorkflowState: WorkflowState = {
  currentStep: 0,
  totalSteps: 3,
  wizardData: initialProjectWizardData,
  isSubmitting: false,
  submitSuccess: false,
  error: null
};
