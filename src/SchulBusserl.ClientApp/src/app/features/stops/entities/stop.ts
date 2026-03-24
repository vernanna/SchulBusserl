import { Address } from 'app/features/stops/entities/address';

export default interface Stop {
  id: string;
  name: string;
  longitude: number;
  latitude: number;
  address: Address;
}
