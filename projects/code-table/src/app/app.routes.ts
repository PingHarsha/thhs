import { Routes } from '@angular/router';
import { APP_ROUTES } from './shared/types';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: APP_ROUTES.productionTables,
  },
  {
    canMatch: [authGuard, roleGuard],
    loadComponent: () =>
      import('./projects/projects.component').then(m => m.ProjectsComponent),
    path: APP_ROUTES.projects,
    title: 'Projects',
  },
  {
    canMatch: [authGuard, roleGuard],
    loadComponent: () =>
      import('./production-tables/production-tables.component').then(
        m => m.ProductionTablesComponent
      ),
    path: APP_ROUTES.productionTables,
    title: 'Production Tables',
  },
  {
    canMatch: [authGuard, roleGuard],
    loadComponent: () =>
      import('./admin/admin.component').then(m => m.AdminComponent),
    path: APP_ROUTES.admin,
    title: 'Admin',
  },
  {
    canMatch: [authGuard, roleGuard],
    loadComponent: () =>
      import('./rugs/rugs.component').then(m => m.RugsComponent),
    path: APP_ROUTES.rugs,
    title: 'Rugs',
  },
  {
    canMatch: [authGuard],
    loadComponent: () =>
      import('./restricted/restricted.component').then(
        m => m.RestrictedComponent
      ),
    path: APP_ROUTES.restricted,
    title: 'Restricted',
  },
  {
    canMatch: [authGuard],
    loadComponent: () =>
      import('./four-o-four/four-o-four.component').then(
        c => c.FourOFourComponent
      ),
    path: '**',
    title: '404',
  },
];
