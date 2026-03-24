import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { CreateStopDialogContext, CreateStopDialogStore, CreateStopDialogFormValue } from 'app/features/stops/components/create-stop-dialog/create-stop-dialog.store';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormDialogDirective } from 'app/shared/dialogs/form-dialog.directive';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { LocationPickerComponent } from 'app/shared/maps/location-picker/location-picker.component';
import { SaveDialogActionsComponent } from 'app/shared/dialogs/actions/save-dialog-actions/save-dialog-actions.component';

@Component({
  selector: 'app-create-stop-dialog',
  templateUrl: './create-stop.dialog.html',
  styleUrl: './create-stop.dialog.scss',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    LocationPickerComponent,
    SaveDialogActionsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateStopDialogComponent extends FormDialogDirective<CreateStopDialogContext, CreateStopDialogFormValue, InstanceType<typeof CreateStopDialogStore>, CreateStopForm> {
  protected createForm(formBuilder: FormBuilder, initialValue: Partial<CreateStopDialogFormValue>): CreateStopForm {
    return formBuilder.nonNullable.group({
      name: [initialValue.name ?? '', [Validators.required]],
      longitude: [initialValue.longitude ?? 15.53, [Validators.required, Validators.min(-180), Validators.max(180)]],
      latitude: [initialValue.latitude ?? 46.78, [Validators.required, Validators.min(-90), Validators.max(90)]],
      street: [initialValue.street ?? '', [Validators.required]],
      houseNumber: [initialValue.houseNumber ?? '', [Validators.required]],
      postalCode: [initialValue.postalCode ?? '', [Validators.required]],
      city: [initialValue.city ?? '', [Validators.required]],
    });
  }

  protected onLocationChanged(location: { latitude: number; longitude: number; }): void {
    this.form.patchValue(location);
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

type CreateStopForm = FormGroup<{
  name: FormControl<string>;
  longitude: FormControl<number>;
  latitude: FormControl<number>;
  street: FormControl<string>;
  houseNumber: FormControl<string>;
  postalCode: FormControl<string>;
  city: FormControl<string>;
}>;
