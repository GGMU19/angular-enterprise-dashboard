import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap, exhaustMap, concatMap } from 'rxjs/operators';

import { DashboardActions } from './dashboard.actions';
import { MockDataService } from '../../../core/services/mock-data.service';

export class DashboardEffects {
  private actions$ = inject(Actions);
  private mockDataService = inject(MockDataService);

  // Load Projects Effect
  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadProjects),
      mergeMap(() =>
        this.mockDataService.getProjects().pipe(
          map(projects => DashboardActions.loadProjectsSuccess({ projects })),
          catchError(error =>
            of(
              DashboardActions.loadProjectsFailure({
                error: error.message || 'Failed to load projects'
              })
            )
          )
        )
      )
    )
  );

  // Load Statistics Effect
  loadStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadStats),
      mergeMap(() =>
        this.mockDataService.getDashboardStats().pipe(
          map(stats => DashboardActions.loadStatsSuccess({ stats })),
          catchError(error =>
            of(
              DashboardActions.loadStatsFailure({
                error: error.message || 'Failed to load statistics'
              })
            )
          )
        )
      )
    )
  );

  // Load Activities Effect
  loadActivities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadActivities),
      mergeMap(() =>
        this.mockDataService.getRecentActivities().pipe(
          map(activities => DashboardActions.loadActivitiesSuccess({ activities })),
          catchError(error =>
            of(
              DashboardActions.loadActivitiesFailure({
                error: error.message || 'Failed to load activities'
              })
            )
          )
        )
      )
    )
  );

  // Load All Dashboard Data Effect (convenience)
  // Dispatches multiple actions in parallel
  loadDashboardData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadDashboardData),
      concatMap(() => [
        DashboardActions.loadProjects(),
        DashboardActions.loadStats(),
        DashboardActions.loadActivities()
      ])
    )
  );

  // Create Project Effect
  createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.createProject),
      exhaustMap(({ project }) =>
        this.mockDataService.createProject(project).pipe(
          map(newProject => DashboardActions.createProjectSuccess({ project: newProject })),
          catchError(error =>
            of(
              DashboardActions.createProjectFailure({
                error: error.message || 'Failed to create project'
              })
            )
          )
        )
      )
    )
  );

  // Update Project Effect
  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.updateProject),
      exhaustMap(({ project }) =>
        this.mockDataService.updateProject(project).pipe(
          map(updatedProject => DashboardActions.updateProjectSuccess({ project: updatedProject })),
          catchError(error =>
            of(
              DashboardActions.updateProjectFailure({
                error: error.message || 'Failed to update project'
              })
            )
          )
        )
      )
    )
  );

  // Delete Project Effect
  deleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.deleteProject),
      exhaustMap(({ projectId }) =>
        this.mockDataService.deleteProject(projectId).pipe(
          map(() => DashboardActions.deleteProjectSuccess({ projectId })),
          catchError(error =>
            of(
              DashboardActions.deleteProjectFailure({
                error: error.message || 'Failed to delete project'
              })
            )
          )
        )
      )
    )
  );
}
