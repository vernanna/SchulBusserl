import { Subject } from 'rxjs';
import { InjectionToken } from '@angular/core';

export default class DialogEvents {
  public readonly closeRequested = new Subject<void>();
}

export const DIALOG_EVENTS = new InjectionToken<unknown>('DIALOG_EVENTS');
