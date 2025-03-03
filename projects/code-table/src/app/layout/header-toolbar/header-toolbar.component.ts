import { Component, inject } from '@angular/core';
import { AppStore } from '../../app.store';
import { MatToolbar } from '@angular/material/toolbar';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuTrigger } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderToolbarMenuComponent } from '../header-toolbar-menu/header-toolbar-menu.component';

@Component({
  imports: [
    MatToolbar,
    MatAnchor,
    MatButton,
    MatIcon,
    MatMenuTrigger,
    RouterLink,
    HeaderToolbarMenuComponent,
    RouterLinkActive,
  ],
  selector: 'app-header-toolbar',
  styleUrl: './header-toolbar.component.scss',
  templateUrl: './header-toolbar.component.html',
})
export class HeaderToolbarComponent {
  readonly #appStore = inject(AppStore);
  menuLinks = this.#appStore.menuLinks();
}
