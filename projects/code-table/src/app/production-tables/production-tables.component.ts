import {
  ChangeDetectionStrategy,
  Component,
  effect,
  HostBinding,
  inject,
} from '@angular/core';
import { ProductionTablesStore } from './production-tables.store';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { NgForOf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductionTableData } from './shared/types';
import { take } from 'rxjs';
import { SnakeCaseToStringPipe } from '../shared/pipes/snake-case-to-string.pipe';
import { MatPaginator } from '@angular/material/paginator';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-production-tables',
  imports: [
    MatColumnDef,
    MatTable,
    NgForOf,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    SnakeCaseToStringPipe,
    MatPaginator,
    MatDivider,
  ],
  templateUrl: './production-tables.component.html',
  styleUrl: './production-tables.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductionTablesComponent {
  @HostBinding('class') className = 'h-full';
  tableName = '';
  protected displayedColumns: string[] = [];
  protected columnsToDisplay: string[] = [];
  protected data: ProductionTableData[] = [];
  readonly #productionTablesStore = inject(ProductionTablesStore);
  readonly #route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      this.#route.params.pipe(take(1)).subscribe(params => {
        const id = params['id'];
        const tableDetails =
          this.#productionTablesStore.getTableDetailsById(+id);
        if (!tableDetails) {
          return;
        }
        const keys = new Set<string>();
        tableDetails.data.forEach(table =>
          Object.keys(table).forEach(key => keys.add(key))
        );
        this.displayedColumns = Array.from(keys);
        this.columnsToDisplay = Array.from(keys);
        this.tableName = `${tableDetails.name} Production Table`;
        this.data = tableDetails.data;
      });
    });
  }
}
