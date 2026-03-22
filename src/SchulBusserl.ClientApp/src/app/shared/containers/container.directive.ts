import { DestroyRef, Directive, inject, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DialogStoreLike } from '../dialogs/dialog.store';
import { DialogDirective } from '../dialogs/dialog.directive';
import { ComponentType } from '@angular/cdk/portal';
import Dialog from '../dialogs/dialog';
import DialogEvents from '../dialogs/dialog-events';
import { FormDialogDirective } from '../dialogs/form-dialog.directive';
import FormDialogEvents from '../dialogs/form-dialog-events';
import FormDialog, { FormContextOf, FormEventsOf, FormStoreOf, ValueOf } from '../dialogs/form-dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmationDialogDirective } from '../dialogs/confirmation/confirmation-dialog.directive';
import ConfirmationDialog, { ConfirmationContextOf, ConfirmationEventsOf, ConfirmationStoreOf } from '../dialogs/confirmation/confirmation-dialog';
import ConfirmationDialogEvents from '../dialogs/confirmation/confirmation-dialog-events';
import FormDialogSubmission from '../dialogs/form-dialog-submission';
import ConfirmationDialogSubmission from '../dialogs/confirmation/confirmation-dialog-submission';

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

  protected registerConfirmationDialog<TComponent extends ConfirmationDialogDirective<ConfirmationContextOf<TComponent>, ConfirmationStoreOf<TComponent>, ConfirmationEventsOf<TComponent>>>(
    component: ComponentType<TComponent>,
    dialogStoreType: Type<ConfirmationStoreOf<TComponent>>,
    onSubmit: (submission: ConfirmationDialogSubmission<ConfirmationContextOf<TComponent>>) => void,
  ): ConfirmationDialog<ConfirmationContextOf<TComponent>, ConfirmationStoreOf<TComponent>, ConfirmationEventsOf<TComponent>> {
    const dialogStore = inject(dialogStoreType);
    const dialog = new ConfirmationDialog<ConfirmationContextOf<TComponent>, ConfirmationStoreOf<TComponent>, ConfirmationEventsOf<TComponent>>(dialogStore, component);

    (dialog.events as ConfirmationDialogEvents).submitRequested
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => onSubmit(new ConfirmationDialogSubmission(dialog.context(), dialogStore)));

    return dialog;
  }

  protected registerFormDialog<TComponent extends FormDialogDirective<FormContextOf<TComponent>, ValueOf<TComponent>, FormStoreOf<TComponent>, FormGroup, FormEventsOf<TComponent>>>(
    component: ComponentType<TComponent>,
    dialogStoreType: Type<FormStoreOf<TComponent>>,
    onSubmit: (data: FormDialogSubmission<FormContextOf<TComponent>, ValueOf<TComponent>>) => void,
  ): FormDialog<FormContextOf<TComponent>, ValueOf<TComponent>, FormStoreOf<TComponent>, FormEventsOf<TComponent>> {
    const dialogStore = inject(dialogStoreType);
    const dialog = new FormDialog<FormContextOf<TComponent>, ValueOf<TComponent>, FormStoreOf<TComponent>, FormEventsOf<TComponent>>(dialogStore, component);

    (dialog.events as FormDialogEvents<ValueOf<TComponent>>).submitRequested
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => onSubmit(new FormDialogSubmission(dialog.context(), value, dialogStore)));

    return dialog;
  }

  protected registerFormDialogWithEvents<TComponent extends FormDialogDirective<FormContextOf<TComponent>, ValueOf<TComponent>, FormStoreOf<TComponent>, FormGroup, FormEventsOf<TComponent>>>(
    component: ComponentType<TComponent>,
    dialogStoreType: Type<FormStoreOf<TComponent>>,
    dialogEventsType: Type<FormEventsOf<TComponent>> = FormDialogEvents<ValueOf<TComponent>> as unknown as Type<FormEventsOf<TComponent>>,
    onSubmit: (data: FormDialogSubmission<FormContextOf<TComponent>, ValueOf<TComponent>>) => void,
  ): FormDialog<FormContextOf<TComponent>, ValueOf<TComponent>, FormStoreOf<TComponent>, FormEventsOf<TComponent>> {
    const dialogStore = inject(dialogStoreType);
    const dialog = new FormDialog<FormContextOf<TComponent>, ValueOf<TComponent>, FormStoreOf<TComponent>, FormEventsOf<TComponent>>(dialogStore, component, dialogEventsType);

    (dialog.events as FormDialogEvents<ValueOf<TComponent>>).submitRequested
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => onSubmit(new FormDialogSubmission(dialog.context(), value, dialogStore)));

    return dialog;
  }
}
