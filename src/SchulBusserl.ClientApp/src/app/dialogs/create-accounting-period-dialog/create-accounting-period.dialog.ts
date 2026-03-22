import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { CreateAccountingPeriodDialogContext, CreateAccountingPeriodDialogStore, CreateAccountingPeriodDialogFormValue } from './create-accounting-period-dialog.store';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
export class CreateAccountingPeriodDialogComponent extends FormDialogDirective<CreateAccountingPeriodDialogContext, CreateAccountingPeriodDialogFormValue, InstanceType<typeof CreateAccountingPeriodDialogStore>, CreateAccountingPeriodForm> {
  protected createForm(formBuilder: FormBuilder, initialValue: Partial<CreateAccountingPeriodDialogFormValue>): CreateAccountingPeriodForm {
    return formBuilder.nonNullable.group({
      name: [initialValue.name ?? '', [Validators.required]],
    });
  }

  protected onSubmitRequested() {
    this.events.submitRequested.next({ name: this.form.value.name! });
  }
}

type CreateAccountingPeriodForm = FormGroup<{ name: FormControl<string>; }>;

