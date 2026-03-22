import { DIALOG_STORE, DialogStoreLike } from 'app/shared/dialogs/dialog.store';
import { createEnvironmentInjector, DestroyRef, effect, EnvironmentInjector, inject, Signal, untracked } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import DialogEvents, { DIALOG_EVENTS } from 'app/shared/dialogs/dialog-events';
import { Subject, takeUntil } from 'rxjs';

export default abstract class DialogBase<TContext, TStore extends DialogStoreLike<TContext>, TEvents extends DialogEvents> {
  private readonly dialog = inject(MatDialog);
  private readonly envInjector = inject(EnvironmentInjector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly close$ = new Subject<void>();
  private dialogRef: MatDialogRef<unknown> | null = null;

  public readonly events: TEvents;
  public readonly context: Signal<TContext>;

  constructor(
    protected readonly dialogStore: TStore,
    component: ComponentType<unknown>,
    events: TEvents,
  ) {
    this.events = events;
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

  public close(): void {
    this.dialogRef?.close();
  }
}
