import { Component, computed, HostBinding, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './shared/app.service';
import { LayoutComponent } from './layout/layout.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @HostBinding('class') appClass =
    'flex flex-col w-full h-full items-stretch justify-start';
  readonly #appService = inject(AppService);
  title = computed(() => `Code Table | ${this.#appService.title()}`);
}
