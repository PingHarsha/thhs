import { Routes } from '@angular/router';
import { ADMIN_ROUTES } from './shared/types';

export const routes: Routes = [
  {
    path: '',
    redirectTo: ADMIN_ROUTES.email,
    pathMatch: 'full',
  },
  {
    path: ADMIN_ROUTES.email,
    loadComponent: () =>
      import('./email/email.component').then(m => m.EmailComponent),
  },
  {
    path: ADMIN_ROUTES.batch,
    loadComponent: () =>
      import('./batch/batch.component').then(m => m.BatchComponent),
  },
  {
    path: ADMIN_ROUTES.dadType,
    loadComponent: () =>
      import('./dad-type/dad-type.component').then(m => m.DadTypeComponent),
  },
];
