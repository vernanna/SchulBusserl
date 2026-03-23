import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { UpdateStopDialogContext, UpdateStopDialogStore, UpdateStopDialogFormValue } from 'app/features/stops/components/update-stop-dialog/update-stop-dialog.store';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormDialogDirective } from 'app/shared/dialogs/form-dialog.directive';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { SaveDialogActionsComponent } from 'app/shared/dialogs/actions/save-dialog-actions/save-dialog-actions.component';

@Component({
  selector: 'app-update-stop-dialog',
  templateUrl: './update-stop.dialog.html',
  styleUrl: './update-stop.dialog.scss',
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
export class UpdateStopDialogComponent extends FormDialogDirective<UpdateStopDialogContext, UpdateStopDialogFormValue, InstanceType<typeof UpdateStopDialogStore>, UpdateStopForm> {
  protected createForm(formBuilder: FormBuilder, initialValue: Partial<UpdateStopDialogFormValue>): UpdateStopForm {
    return formBuilder.nonNullable.group({
      name: [initialValue.name ?? '', [Validators.required]],
      longitude: [initialValue.longitude ?? 0, [Validators.required, Validators.min(-180), Validators.max(180)]],
      latitude: [initialValue.latitude ?? 0, [Validators.required, Validators.min(-90), Validators.max(90)]],
      street: [initialValue.street ?? '', [Validators.required]],
      houseNumber: [initialValue.houseNumber ?? '', [Validators.required]],
      postalCode: [initialValue.postalCode ?? '', [Validators.required]],
      city: [initialValue.city ?? '', [Validators.required]],
    });
  }

  protected onSubmitRequested() {
    this.events.submitRequested.next({
      name: this.form.value.name!,
      longitude: this.form.value.longitude!,
      latitude: this.form.value.latitude!,
      street: this.form.value.street!,
      houseNumber: this.form.value.houseNumber!,
      postalCode: this.form.value.postalCode!,
      city: this.form.value.city!,
    });
  }
}

type UpdateStopForm = FormGroup<{
  name: FormControl<string>;
  longitude: FormControl<number>;
  latitude: FormControl<number>;
  street: FormControl<string>;
  houseNumber: FormControl<string>;
  postalCode: FormControl<string>;
  city: FormControl<string>;
}>;
