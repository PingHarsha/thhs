import { Routes } from '@angular/router';
import { PROJECTS_ROUTES } from './shared/constants';

const { testPhases, workInProgress, archived, deleted } = PROJECTS_ROUTES;

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: workInProgress.path,
  },
  {
    data: { pageTitle: workInProgress.title },
    loadComponent: () =>
      import('./work-in-progress/work-in-progress.component').then(
        c => c.WorkInProgressComponent
      ),
    path: workInProgress.path,
  },
  {
    data: { pageTitle: testPhases.title },
    loadComponent: () =>
      import('./test-phases/test-phases.component').then(
        m => m.TestPhasesComponent
      ),
    loadChildren: () =>
      import('./test-phases/test-phases.routes').then(m => m.testPhasesRoutes),
    path: testPhases.path,
  },
  {
    data: { pageTitle: archived.title },
    loadComponent: () =>
      import('./archived/archived.component').then(m => m.ArchivedComponent),
    path: archived.path,
  },
  {
    data: { pageTitle: archived.title },
    loadComponent: () =>
      import('./deleted/deleted.component').then(m => m.DeletedComponent),
    path: deleted.path,
  },
];
