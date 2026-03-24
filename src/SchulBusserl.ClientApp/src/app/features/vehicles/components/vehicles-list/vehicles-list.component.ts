import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { VehiclesStore } from 'app/features/vehicles/state/vehicles.store';
import { ContainerDirective } from 'app/shared/containers/container.directive';
import { CreateVehicleDialogComponent } from 'app/features/vehicles/components/create-vehicle-dialog/create-vehicle.dialog';
import { CreateVehicleDialogStore } from 'app/features/vehicles/components/create-vehicle-dialog/create-vehicle-dialog.store';
import { FormDialogFor } from 'app/shared/dialogs/form-dialog';
import { UpdateVehicleDialogComponent } from 'app/features/vehicles/components/update-vehicle-dialog/update-vehicle.dialog';
import { UpdateVehicleDialogStore } from 'app/features/vehicles/components/update-vehicle-dialog/update-vehicle-dialog.store';
import { DeleteVehicleDialogComponent } from 'app/features/vehicles/components/delete-vehicle-dialog/delete-vehicle.dialog';
import { DeleteVehicleDialogStore } from 'app/features/vehicles/components/delete-vehicle-dialog/delete-vehicle-dialog.store';
import { ConfirmationDialogFor } from 'app/shared/dialogs/confirmation/confirmation-dialog';
import Vehicle from 'app/features/vehicles/entities/vehicle';
import { ascending } from 'app/shared/utils/array-utils';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrl: './vehicles-list.component.scss',
  imports: [
    MatIcon,
    MatButton,
    MatIconButton,
    MatTableModule,
    MatProgressSpinner,
  ],
  providers: [VehiclesStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehiclesListComponent extends ContainerDirective {
  private readonly vehiclesStore = inject(VehiclesStore);
  protected readonly columnsToDisplay = ['name', 'licensePlate', 'numberOfPassengerSeats', 'actions'];
  protected readonly vehicles = computed(() => [...(this.vehiclesStore.vehicles().value ?? [])].sort(ascending(vehicle => vehicle.name)));
  protected readonly isLoading = computed(() => this.vehiclesStore.vehicles().isLoading);

  protected readonly createVehicleDialog: FormDialogFor<CreateVehicleDialogComponent>;
  protected readonly updateVehicleDialog: FormDialogFor<UpdateVehicleDialogComponent>;
  protected readonly deleteVehicleDialog: ConfirmationDialogFor<DeleteVehicleDialogComponent>;

  constructor() {
    super();
    this.createVehicleDialog = this.registerFormDialog(
      CreateVehicleDialogComponent,
      CreateVehicleDialogStore,
      submission => this.vehiclesStore.createVehicle(submission));
    this.updateVehicleDialog = this.registerFormDialog(
      UpdateVehicleDialogComponent,
      UpdateVehicleDialogStore,
      submission => this.vehiclesStore.updateVehicle(submission));
    this.deleteVehicleDialog = this.registerConfirmationDialog(
      DeleteVehicleDialogComponent,
      DeleteVehicleDialogStore,
      submission => this.vehiclesStore.deleteVehicle(submission));
  }

  protected onCreateVehicleClick() {
    this.createVehicleDialog.open({});
  }

  protected onUpdateVehicleClick(vehicle: Vehicle) {
    this.updateVehicleDialog.open(
      { id: vehicle.id },
      { name: vehicle.name, licensePlate: vehicle.licensePlate, numberOfPassengerSeats: vehicle.numberOfPassengerSeats },
    );
  }

  protected onDeleteVehicleClick(vehicle: Vehicle) {
    this.deleteVehicleDialog.open({ vehicle });
  }
}
