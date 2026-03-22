import Vehicle from 'app/features/vehicles/entities/vehicle';
import { Loadable, Loadables } from 'app/shared/entities/loadable';

export interface VehiclesState {
  vehicles: Loadable<Vehicle[]>;
}

export const initialVehiclesState: VehiclesState = {
  vehicles: Loadables.initial([]),
};
