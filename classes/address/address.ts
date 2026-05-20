import City from "./city";

export class Address {
  public id: number;
  public street: string;
  public neighborhood: string;
  public number: string;
  public zipCode: string;
  public city: City;
  public complement?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    this.id = data.id;
    this.street = data.street;
    this.neighborhood = data.neighborhood;
    this.number = data.number;
    this.zipCode = data.zipCode;
    this.city = new City(data.city);
    this.complement = data.complement;
  }
}
