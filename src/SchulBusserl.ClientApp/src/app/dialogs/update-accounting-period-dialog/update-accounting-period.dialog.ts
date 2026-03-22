import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { UpdateAccountingPeriodDialogContext, UpdateAccountingPeriodDialogStore, UpdateAccountingPeriodDialogFormValue } from './update-accounting-period-dialog.store';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormDialogDirective } from '../../shared/dialogs/form-dialog.directive';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { SaveDialogActionsComponent } from '../../shared/dialogs/actions/save-dialog-actions/save-dialog-actions.component';

@Component({
  selector: 'app-update-accounting-period-dialog',
  templateUrl: './update-accounting-period.dialog.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    SaveDialogActionsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateAccountingPeriodDialogComponent extends FormDialogDirective<UpdateAccountingPeriodDialogContext, UpdateAccountingPeriodDialogFormValue, InstanceType<typeof UpdateAccountingPeriodDialogStore>> {
  protected readonly form;

  constructor() {
    super();
    this.form = this.formBuilder.nonNullable.group({
      name: [this.initialValue().name, [Validators.required]],
    });
  }

  protected onSubmitRequested() {
    this.events.submitRequested.next({ name: this.form.value.name! });
  }
}
