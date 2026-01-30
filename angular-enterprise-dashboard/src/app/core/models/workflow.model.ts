/**
 * Workflow Models
 *
 * Defines the structure for multi-step workflow/wizard functionality.
 */

export interface WorkflowStep {
  id: string;
  label: string;
  completed: boolean;
  valid: boolean;
}

export interface ProjectWizardData {
  // Step 1: Setup
  projectName: string;
  projectType: 'web' | 'mobile' | 'desktop' | 'api' | '';
  priority: 'low' | 'medium' | 'high' | '';

  // Step 2: Details
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  teamSize: number | null;
  budget: number | null;

  // Step 3: Review (no additional fields, just shows summary)
}

export const initialProjectWizardData: ProjectWizardData = {
  projectName: '',
  projectType: '',
  priority: '',
  description: '',
  startDate: null,
  endDate: null,
  teamSize: null,
  budget: null
};
