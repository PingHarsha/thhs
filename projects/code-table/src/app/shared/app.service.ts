import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _title = signal('');

  get title(): Signal<string> {
    return this._title.asReadonly();
  }

  set title(value: WritableSignal<string>) {
    this._title = value;
  }
}
