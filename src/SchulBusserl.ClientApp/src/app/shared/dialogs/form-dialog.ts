import { DIALOG_STORE, DialogStoreLike } from './dialog.store';
import { createEnvironmentInjector, DestroyRef, effect, EnvironmentInjector, inject, Signal, Type, untracked } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { DIALOG_EVENTS } from './dialog-events';
import { Subject, takeUntil } from 'rxjs';
import { FormDialogDirective } from './form-dialog.directive';
import FormDialogEvents from './form-dialog-events';
import { FormDialogStoreLike } from './form-dialog.store';

export default class FormDialog<TContext, TValue, TStore extends FormDialogStoreLike<TContext, TValue>, TEvents extends FormDialogEvents<TValue>> {
  private readonly dialog = inject(MatDialog);
  private readonly envInjector = inject(EnvironmentInjector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly close$ = new Subject<void>();
  private dialogRef: MatDialogRef<unknown> | null = null;

  public readonly events: TEvents;
  public readonly context: Signal<TContext>;

  constructor(private readonly dialogStore: TStore, component: ComponentType<FormDialogDirective<TContext, TValue, TStore, TEvents>>, dialogEventsType: Type<TEvents>) {
    this.events = new dialogEventsType();
    this.context = dialogStore.context;

    const effectRef = effect(() => {
      const isOpen = dialogStore.isOpen();

      if (isOpen && this.dialogRef == null) {
        const dialogInjector = createEnvironmentInjector(
          [
            { provide: DIALOG_EVENTS, useValue: this.events },
            { provide: DIALOG_STORE, useValue: this.dialogStore },
          ],
          this.envInjector,
        );
        this.dialogRef = this.dialog.open(component, { injector: dialogInjector });

        this.dialogRef.afterClosed()
          .pipe(takeUntil(this.close$))
          .subscribe(() => {
            this.dialogRef = null;
            this.close$.next();
            if (dialogStore.isOpen()) {
              untracked(() => dialogStore.close());
            }
          });

        this.events.closeRequested.pipe(takeUntil(this.close$)).subscribe(() => this.dialogRef?.close());
      }

      if (!isOpen && this.dialogRef != null) {
        this.dialogRef.close();
      }
    });

    this.destroyRef.onDestroy(() => {
      this.dialogRef?.close();
      this.close$.next();
      this.close$.complete();
      effectRef.destroy();
    });
  }

  public open(context: TContext, value?: TValue): void {
    this.dialogStore.open(context, value);
  }

  public close(): void {
    this.dialogRef?.close();
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ContextOf<T> = T extends FormDialogDirective<infer TContext, any, any, any> ? TContext : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValueOf<T> = T extends FormDialogDirective<any, infer TValue, any, any> ? TValue : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StoreOf<T> = T extends FormDialogDirective<any, any, infer TStore extends FormDialogStoreLike<ContextOf<T>, ValueOf<T>>, any> ? TStore : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EventsOf<T> = T extends FormDialogDirective<any, any, any, infer TEvents> ? TEvents : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormDialogFor<TComponent> = TComponent extends FormDialogDirective<any, any, any, any>
  ? FormDialog<ContextOf<TComponent>, ValueOf<TComponent>, StoreOf<TComponent>, EventsOf<TComponent>>
  : never;
