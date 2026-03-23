export class Marker {
  constructor(
    public readonly id: string,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly tooltip: string,
  ) {}
}
