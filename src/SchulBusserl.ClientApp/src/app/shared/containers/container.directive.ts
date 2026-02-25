import { DestroyRef, Directive, inject, Type } from '@angular/core';
import { DialogStoreLike } from '../dialogs/dialog.store';
import { DialogDirective } from '../dialogs/dialog.directive';
import { ComponentType } from '@angular/cdk/portal';
import Dialog from '../dialogs/dialog';
import DialogEvents from '../dialogs/dialog-events';
import { FormDialogDirective } from '../dialogs/form-dialog.directive';
import FormDialogEvents from '../dialogs/form-dialog-events';
import FormDialog, { ContextOf, EventsOf, StoreOf, ValueOf } from '../dialogs/form-dialog';
import FormDialogSubmission from '../dialogs/dialog-submission';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive()
export abstract class ContainerDirective {
  protected readonly destroyRef = inject(DestroyRef);

  protected registerDialog<TContext, TStore extends DialogStoreLike<TContext>, TEvents extends DialogEvents>(
    component: ComponentType<DialogDirective<TContext, TStore, TEvents>>,
    dialogStoreType: Type<TStore>,
    dialogEventsType: Type<TEvents>,
  ): Dialog<TContext, TStore, TEvents> {
    const dialogStore = inject(dialogStoreType);
    return new Dialog(dialogStore, component, dialogEventsType);
  }

  protected registerFormDialog<TComponent extends FormDialogDirective<ContextOf<TComponent>, ValueOf<TComponent>, StoreOf<TComponent>, EventsOf<TComponent>>>(
    component: ComponentType<TComponent>,
    dialogStoreType: Type<StoreOf<TComponent>>,
    dialogEventsType: Type<EventsOf<TComponent>> = FormDialogEvents<ValueOf<TComponent>> as unknown as Type<EventsOf<TComponent>>,
    onSubmit: (data: FormDialogSubmission<ValueOf<TComponent>>) => void,
  ): FormDialog<ContextOf<TComponent>, ValueOf<TComponent>, StoreOf<TComponent>, EventsOf<TComponent>> {
    const dialogStore = inject(dialogStoreType);
    const dialog = new FormDialog<ContextOf<TComponent>, ValueOf<TComponent>, StoreOf<TComponent>, EventsOf<TComponent>>(dialogStore, component, dialogEventsType);

    (dialog.events as FormDialogEvents<ValueOf<TComponent>>).submitRequested
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => onSubmit(new FormDialogSubmission(value, dialogStore)));

    return dialog;
  }
}
