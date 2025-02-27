import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatMenu,
  MatMenuContent,
  MatMenuItem,
  MatMenuTrigger,
} from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-header-toolbar',
  imports: [
    MatButton,
    MatMenu,
    MatToolbar,
    MatMenuTrigger,
    MatMenuItem,
    MatIcon,
    MatMenuContent,
  ],
  templateUrl: './header-toolbar.component.html',
  styleUrl: './header-toolbar.component.scss',
})
export class HeaderToolbarComponent {}
