import { Address } from 'app/features/stops/entities/address';

export default class NewStop {
  constructor(
    public readonly name: string,
    public readonly longitude: number,
    public readonly latitude: number,
    public readonly address: Address,
  ) {
  }
}
