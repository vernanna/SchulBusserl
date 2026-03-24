export default class UpdatedVehicle {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly licensePlate: string,
    public readonly numberOfPassengerSeats: number,
  ) {
  }
}
