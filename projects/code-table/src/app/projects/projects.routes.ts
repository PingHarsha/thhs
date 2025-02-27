import { Routes } from '@angular/router';
import { PROJECTS_ROUTES } from './shared/types';

export const routes: Routes = [
  {
    path: '',
    redirectTo: PROJECTS_ROUTES.workInProgress,
    pathMatch: 'full',
  },
  {
    path: PROJECTS_ROUTES.workInProgress,
    loadComponent: () =>
      import('./work-in-progress/work-in-progress.component').then(
        c => c.WorkInProgressComponent
      ),
  },
  {
    path: PROJECTS_ROUTES.testPhases,
    loadComponent: () =>
      import('./test-phases/test-phases.component').then(
        m => m.TestPhasesComponent
      ),
  },
  {
    path: PROJECTS_ROUTES.archived,
    loadComponent: () =>
      import('./archived/archived.component').then(m => m.ArchivedComponent),
  },
  {
    path: PROJECTS_ROUTES.deleted,
    loadComponent: () =>
      import('./deleted/deleted.component').then(m => m.DeletedComponent),
  },
];
