import { Address as DomainAddress } from 'app/features/stops/entities/address';

export interface Address {
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
}

export function addressToDomainModel(address: Address): DomainAddress {
  return {
    street: address.street,
    houseNumber: address.houseNumber,
    postalCode: address.postalCode,
    city: address.city,
  };
}
