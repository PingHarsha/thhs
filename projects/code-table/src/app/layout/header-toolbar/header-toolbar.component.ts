import { Component } from '@angular/core';
import { MatAnchor, MatButton } from '@angular/material/button';
import {
  MatMenu,
  MatMenuContent,
  MatMenuItem,
  MatMenuTrigger,
} from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { APP_ROUTES } from '../../shared/types';
import { PROJECTS_ROUTES } from '../../projects/shared/types';
import { RUGS_ROUTES } from '../../rugs/shared/types';
import { ADMIN_ROUTES } from '../../admin/shared/types';

@Component({
  selector: 'app-header-toolbar',
  imports: [
    MatMenu,
    MatToolbar,
    MatMenuTrigger,
    MatMenuItem,
    MatIcon,
    MatMenuContent,
    MatAnchor,
    RouterLink,
    MatButton,
  ],
  templateUrl: './header-toolbar.component.html',
  styleUrl: './header-toolbar.component.scss',
})
export class HeaderToolbarComponent {
  protected readonly APP_ROUTES = APP_ROUTES;
  protected readonly PROJECTS_ROUTES = PROJECTS_ROUTES;
  protected readonly ADMIN_ROUTES = ADMIN_ROUTES;
  protected readonly RUGS_ROUTES = RUGS_ROUTES;
}
