import { Component, effect, HostBinding, inject, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs';
import { LayoutStore } from './layout.store';
import { MenuLink } from './shared/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    HeaderComponent,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatTabLink,
    MatTabNav,
    MatTabNavPanel,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  @HostBinding('class') appClass =
    'flex flex-col w-full h-full items-stretch justify-start gap-3';
  links = signal<MenuLink[]>([]);
  activeIds = signal<string[]>([]);
  readonly layoutStore = inject(LayoutStore);
  readonly router = inject(Router);

  constructor() {
    effect(() => {
      const link = this.layoutStore.activeLink();
      this.activeIds.set(this.layoutStore.activeIds());
      if (link.children && link.children.length > 0) {
        this.links.set(link.children);
      } else {
        this.links.set([
          {
            title: link.title ?? '',
            path: link.path ?? '',
            children: [],
            id: link.id ?? '',
          },
        ]);
      }
    });
  }

  navigate(path: string) {
    this.router.navigate([path]).then();
  }
}
