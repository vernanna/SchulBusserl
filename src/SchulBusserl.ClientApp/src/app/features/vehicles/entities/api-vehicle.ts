import DomainVehicle from 'app/features/vehicles/entities/vehicle';

export interface Vehicle {
  id: string;
  name: string;
  licensePlate: string;
  numberOfPassengerSeats: number;
}

export function vehicleToDomainModel(vehicle: Vehicle): DomainVehicle {
  return {
    id: vehicle.id,
    name: vehicle.name,
    licensePlate: vehicle.licensePlate,
    numberOfPassengerSeats: vehicle.numberOfPassengerSeats,
  };
}
