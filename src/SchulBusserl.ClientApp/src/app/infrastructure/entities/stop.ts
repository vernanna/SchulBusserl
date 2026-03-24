import DomainStop from 'app/features/stops/entities/stop';
import { Address, addressToDomainModel } from 'app/infrastructure/entities/address';

export interface Stop {
  id: string;
  name: string;
  longitude: number;
  latitude: number;
  address: Address;
}

export function stopToDomainModel(stop: Stop): DomainStop {
  return {
    id: stop.id,
    name: stop.name,
    longitude: stop.longitude,
    latitude: stop.latitude,
    address: addressToDomainModel(stop.address),
  };
}
