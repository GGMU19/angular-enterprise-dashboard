import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';
import { WorkflowActions } from './workflow.actions';

/**
 * Workflow Effects
 *
 * Side effects for workflow actions (e.g., API calls, persistence).
 */
export class WorkflowEffects {
  private actions$ = inject(Actions);

  /**
   * Simulate wizard submission to API
   * In a real app, this would call an API service
   */
  submitWizard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkflowActions.submitWizard),
      delay(1500), // Simulate API delay
      map(() => {
        // Simulate successful submission
        console.log('Project wizard submitted successfully!');
        return WorkflowActions.submitSuccess();
      }),
      catchError(error => {
        console.error('Wizard submission failed:', error);
        return of(
          WorkflowActions.submitFailure({
            error: 'Failed to submit project. Please try again.'
          })
        );
      })
    )
  );
}
