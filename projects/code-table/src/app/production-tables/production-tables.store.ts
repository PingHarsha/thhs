import {
  patchState,
  signalStore,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { inject } from '@angular/core';
import { ProductionTablesService } from './api/production-tables.service';
import { AppStore } from '../app.store';
import { ProductionTable } from './shared/types';

interface ProductionTablesStore {
  data: ProductionTable[];
}

const initialState: ProductionTablesStore = {
  data: [],
};

export const ProductionTablesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps(() => ({
    _productionTablesService: inject(ProductionTablesService),
    _appStore: inject(AppStore),
  })),
  withMethods(({ _productionTablesService, _appStore, ...store }) => ({
    getTableDetailsById(id: number) {
      return store.data().find(details => details.id === id);
    },
    loadProductionTables: rxMethod<void>(
      pipe(
        switchMap(() => {
          return _productionTablesService.getProductionTables().pipe(
            tapResponse({
              error: (error: { message: string }) => {
                patchState(store, { data: [] });
              },
              next: tables => {
                patchState(store, {
                  data: tables,
                });
                _appStore.updateProductionTables(
                  tables.map((table: ProductionTable) => table)
                );
              },
            })
          );
        })
      )
    ),
  }))
);
