import { Routes } from '@angular/router';
import { RUGS_ROUTES } from './shared/types';

export const routes: Routes = [
  {
    path: '',
    redirectTo: RUGS_ROUTES.blockedContracts,
    pathMatch: 'full',
  },
  {
    path: RUGS_ROUTES.blockedContracts,
    loadComponent: () =>
      import('./blocked-contracts/blocked-contracts.component').then(
        m => m.BlockedContractsComponent
      ),
  },
  {
    path: RUGS_ROUTES.rugErrorCodes,
    loadComponent: () =>
      import('./rug-error-codes/rug-error-codes.component').then(
        m => m.RugErrorCodesComponent
      ),
  },
];
