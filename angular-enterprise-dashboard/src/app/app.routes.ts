import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'forms',
    loadChildren: () => import('./features/forms/forms.routes').then(m => m.FORMS_ROUTES)
  },
  {
    path: 'workflow',
    loadComponent: () =>
      import('./features/workflow/project-wizard.component').then(m => m.ProjectWizardComponent)
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
