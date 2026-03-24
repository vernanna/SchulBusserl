import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { CreateVehicleDialogContext, CreateVehicleDialogStore, CreateVehicleDialogFormValue } from 'app/features/vehicles/components/create-vehicle-dialog/create-vehicle-dialog.store';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormDialogDirective } from 'app/shared/dialogs/form-dialog.directive';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { SaveDialogActionsComponent } from 'app/shared/dialogs/actions/save-dialog-actions/save-dialog-actions.component';

@Component({
  selector: 'app-create-vehicle-dialog',
  templateUrl: './create-vehicle.dialog.html',
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
export class CreateVehicleDialogComponent extends FormDialogDirective<CreateVehicleDialogContext, CreateVehicleDialogFormValue, InstanceType<typeof CreateVehicleDialogStore>, CreateVehicleForm> {
  protected createForm(formBuilder: FormBuilder, initialValue: Partial<CreateVehicleDialogFormValue>): CreateVehicleForm {
    return formBuilder.nonNullable.group({
      name: [initialValue.name ?? '', [Validators.required]],
      licensePlate: [initialValue.licensePlate ?? '', [Validators.required]],
      numberOfPassengerSeats: [initialValue.numberOfPassengerSeats ?? 1, [Validators.required, Validators.min(1)]],
    });
  }

  protected onSubmitRequested() {
    this.events.submitRequested.next({
      name: this.form.value.name!,
      licensePlate: this.form.value.licensePlate!,
      numberOfPassengerSeats: this.form.value.numberOfPassengerSeats!,
    });
  }
}

type CreateVehicleForm = FormGroup<{ name: FormControl<string>; licensePlate: FormControl<string>; numberOfPassengerSeats: FormControl<number>; }>;
