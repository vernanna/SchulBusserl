import { Routes } from '@angular/router';
import { VehiclesListComponent } from 'app/features/vehicles/components/vehicles-list/vehicles-list.component';
import { StopsListComponent } from 'app/features/stops/components/stops-list/stops-list.component';

export const routes: Routes = [
  { path: 'vehicles', component: VehiclesListComponent },
  { path: 'stops', component: StopsListComponent },
];
