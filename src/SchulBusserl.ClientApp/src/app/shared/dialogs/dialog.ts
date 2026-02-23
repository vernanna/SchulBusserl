import { DIALOG_STORE, DialogStore } from './dialog.store';
import { createEnvironmentInjector, DestroyRef, effect, EnvironmentInjector, inject, Type, untracked } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { DialogDirective } from './dialog.directive';
import DialogEvents, { DIALOG_EVENTS } from './dialog-events';
import { Subject, takeUntil } from 'rxjs';

export default class Dialog<TContext, TEvents extends DialogEvents> {
  private readonly dialog = inject(MatDialog);
  private readonly envInjector = inject(EnvironmentInjector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly close$ = new Subject<void>();
  private dialogRef: MatDialogRef<unknown> | null = null;

  public readonly events: TEvents;

  constructor(private readonly dialogStore: DialogStore<TContext>, component: ComponentType<DialogDirective<TContext>> & { dialogStore: Type<DialogStore<TContext>>; dialogEvents: Type<TEvents>; }) {
    this.events = new component.dialogEvents();

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

        this.events.closeClicked.pipe(takeUntil(this.close$)).subscribe(() => this.dialogRef?.close());
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
