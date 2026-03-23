import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, signal, viewChildren } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatRow, MatTableModule } from '@angular/material/table';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { StopsStore } from 'app/features/stops/state/stops.store';
import { ContainerDirective } from 'app/shared/containers/container.directive';
import { CreateStopDialogComponent } from 'app/features/stops/components/create-stop-dialog/create-stop.dialog';
import { CreateStopDialogStore } from 'app/features/stops/components/create-stop-dialog/create-stop-dialog.store';
import { FormDialogFor } from 'app/shared/dialogs/form-dialog';
import { UpdateStopDialogComponent } from 'app/features/stops/components/update-stop-dialog/update-stop.dialog';
import { UpdateStopDialogStore } from 'app/features/stops/components/update-stop-dialog/update-stop-dialog.store';
import { DeleteStopDialogComponent } from 'app/features/stops/components/delete-stop-dialog/delete-stop.dialog';
import { DeleteStopDialogStore } from 'app/features/stops/components/delete-stop-dialog/delete-stop-dialog.store';
import { ConfirmationDialogFor } from 'app/shared/dialogs/confirmation/confirmation-dialog';
import Stop from 'app/features/stops/entities/stop';
import { ascending } from 'app/shared/utils/array-utils';
import { StopsMapComponent } from 'app/features/stops/components/stops-map/stops-map.component';

@Component({
  selector: 'app-stops-list',
  templateUrl: './stops-list.component.html',
  styleUrl: './stops-list.component.scss',
  imports: [
    MatIcon,
    MatButton,
    MatIconButton,
    MatTableModule,
    MatProgressSpinner,
    StopsMapComponent,
  ],
  providers: [StopsStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StopsListComponent extends ContainerDirective {
  private readonly stopsStore = inject(StopsStore);
  private readonly tableRows = viewChildren(MatRow, { read: ElementRef });
  protected readonly columnsToDisplay = ['name', 'address', 'actions'];
  protected readonly selectedStopId = signal<string | null>(null);
  protected readonly stops = computed(() => [...(this.stopsStore.stops().value ?? [])].sort(ascending(stop => stop.name)));
  protected readonly isLoading = computed(() => this.stopsStore.stops().isLoading);

  protected readonly createStopDialog: FormDialogFor<CreateStopDialogComponent>;
  protected readonly updateStopDialog: FormDialogFor<UpdateStopDialogComponent>;
  protected readonly deleteStopDialog: ConfirmationDialogFor<DeleteStopDialogComponent>;

  constructor() {
    super();
    this.createStopDialog = this.registerFormDialog(
      CreateStopDialogComponent,
      CreateStopDialogStore,
      submission => this.stopsStore.createStop(submission));
    this.updateStopDialog = this.registerFormDialog(
      UpdateStopDialogComponent,
      UpdateStopDialogStore,
      submission => this.stopsStore.updateStop(submission));
    this.deleteStopDialog = this.registerConfirmationDialog(
      DeleteStopDialogComponent,
      DeleteStopDialogStore,
      submission => this.stopsStore.deleteStop(submission));
  }

  protected onCreateStopClick() {
    this.createStopDialog.open({});
  }

  protected onUpdateStopClick(stop: Stop) {
    this.updateStopDialog.open(
      { id: stop.id },
      {
        name: stop.name,
        longitude: stop.longitude,
        latitude: stop.latitude,
        street: stop.address.street,
        houseNumber: stop.address.houseNumber,
        postalCode: stop.address.postalCode,
        city: stop.address.city,
      },
    );
  }

  protected onDeleteStopClick(stop: Stop) {
    this.deleteStopDialog.open({ stop });
  }

  protected onStopRowClick(stop: Stop): void {
    this.selectedStopId.set(
      this.selectedStopId() === stop.id ? null : stop.id,
    );
  }

  protected onMapStopSelected(stopId: string | null): void {
    this.selectedStopId.set(stopId);
    if (stopId) {
      this.scrollToStop(stopId);
    }
  }

  private scrollToStop(stopId: string): void {
    const stopIndex = this.stops().findIndex(stop => stop.id === stopId);
    const rows = this.tableRows();
    if (stopIndex >= 0 && stopIndex < rows.length) {
      (rows[stopIndex].nativeElement as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}
