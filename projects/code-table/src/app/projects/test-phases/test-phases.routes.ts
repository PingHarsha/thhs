import { Routes } from '@angular/router';
import { TEST_PHASES_ROUTES } from './shared/constants';

export const testPhasesRoutes: Routes = [
  {
    path: '',
    redirectTo: TEST_PHASES_ROUTES.beforeTest.path,
    pathMatch: 'full',
  },
  {
    path: TEST_PHASES_ROUTES.beforeTest.path,
    loadComponent: () =>
      import('./before-tmhp-test/before-tmhp-test.component').then(
        m => m.BeforeTmhpTestComponent
      ),
  },
  {
    path: TEST_PHASES_ROUTES.test.path,
    loadComponent: () =>
      import('./tmhp-test/tmhp-test.component').then(m => m.TmhpTestComponent),
  },
  {
    path: TEST_PHASES_ROUTES.tested.path,
    loadComponent: () =>
      import('./tested/tested.component').then(m => m.TestedComponent),
  },
];
