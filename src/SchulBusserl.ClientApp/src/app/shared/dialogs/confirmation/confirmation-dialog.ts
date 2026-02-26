import { createEnvironmentInjector, DestroyRef, effect, EnvironmentInjector, inject, Signal, Type, untracked } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmationDialogDirective } from './confirmation-dialog.directive';
import ConfirmationDialogEvents from './confirmation-dialog-events';
import { ConfirmationDialogStoreLike } from './confirmation-dialog.store';
import { DIALOG_EVENTS } from '../dialog-events';
import { DIALOG_STORE } from '../dialog.store';

export default class ConfirmationDialog<TContext, TStore extends ConfirmationDialogStoreLike<TContext>, TEvents extends ConfirmationDialogEvents> {
  private readonly dialog = inject(MatDialog);
  private readonly envInjector = inject(EnvironmentInjector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly close$ = new Subject<void>();
  private dialogRef: MatDialogRef<unknown> | null = null;

  public readonly events: TEvents;
  public readonly context: Signal<TContext>;

  constructor(private readonly dialogStore: TStore, component: ComponentType<ConfirmationDialogDirective<TContext, TStore, TEvents>>, dialogEventsType?: Type<TEvents>) {
    this.events = dialogEventsType == null ? new ConfirmationDialogEvents() as TEvents : new dialogEventsType();
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

  public open(context: TContext): void {
    this.dialogStore.open(context);
  }

  public close(): void {
    this.dialogRef?.close();
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConfirmationContextOf<T> = T extends ConfirmationDialogDirective<infer TContext, any, any> ? TContext : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConfirmationStoreOf<T> = T extends ConfirmationDialogDirective<any, infer TStore extends ConfirmationDialogStoreLike<ConfirmationContextOf<T>>, any> ? TStore : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConfirmationEventsOf<T> = T extends ConfirmationDialogDirective<any, any, infer TEvents> ? TEvents : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConfirmationDialogFor<TComponent> = TComponent extends ConfirmationDialogDirective<any, any, any>
  ? ConfirmationDialog<ConfirmationContextOf<TComponent>, ConfirmationStoreOf<TComponent>, ConfirmationEventsOf<TComponent>>
  : never;
