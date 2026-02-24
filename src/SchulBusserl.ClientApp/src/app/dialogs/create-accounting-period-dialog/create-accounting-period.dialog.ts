import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { CreateAccountingPeriodDialogContext, CreateAccountingPeriodDialogStore } from './create-accounting-period-dialog.store';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormDialogDirective } from '../../shared/dialogs/form-dialog.directive';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { SaveDialogActionsComponent } from '../../shared/dialogs/actions/save-dialog-actions/save-dialog-actions.component';

@Component({
  selector: 'app-create-accounting-period-dialog',
  templateUrl: './create-accounting-period.dialog.html',
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
export class CreateAccountingPeriodDialogComponent extends FormDialogDirective<CreateAccountingPeriodDialogContext, InstanceType<typeof CreateAccountingPeriodDialogStore>> {
  protected readonly form;

  constructor() {
    super();
    this.form = this.formBuilder.nonNullable.group({
      name: ['', [Validators.required]],
    });
  }
}
