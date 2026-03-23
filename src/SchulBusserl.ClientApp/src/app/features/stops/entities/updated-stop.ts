import { Address } from 'app/features/stops/entities/address';

export default class UpdatedStop {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly longitude: number,
    public readonly latitude: number,
    public readonly address: Address,
  ) {
  }
}
