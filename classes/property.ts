import { Image } from "@/classes/data/Image";

export default class Property {
  public id: number;
  public name: string;
  public type: string;
  public description: string;
  public isActive: boolean;
  public totalCapacity: number;
  public images: Image[];
  public latitude: string;
  public longitude: string;
  public zipCode: string;
  public address: IAddress;
  public spots?: Spot[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.description = data.description;
    this.isActive = data.isActive;
    this.totalCapacity = data.totalCapacity;
    this.images = data.images;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.zipCode = data.zipCode;
    this.address = data.address;
    this.spots = data.spots;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // public static fromRawData(data: any, stateList: State[]): Property {
  //   data.images = Image.createFromList(data.images);

  //   data.address.city.state = State.getFromList(
  //     data.address.city.stateId,
  //     stateList,
  //   );

  //   data.address.city = new City(data.address.city);

  //   data.address = new Address(data.address);

  //   return new Property(data);
  // }

  // public static create(
  //   data: IProperty & { images: string[] },
  //   states: IState[],
  // ): Property | undefined {
  //   const images = [];
  //   let state: State | undefined;
  //   // let city: City | undefined;

  //   if (states) {
  //     const found = states.find(
  //       (state) => state.id == data.address.city.stateId,
  //     );
  //     if (!found) return undefined;
  //     state = new State(found.id, found.name, found.uf);
  //   } else {
  //     // state = states.find((state) => state.id == data.address.city.stateId);
  //   }

  //   if (!state) return undefined;

  //   const city = new City(data.address.city.id, data.address.city.name, state);

  //   const address = new Address(
  //     data.address.id,
  //     data.address.street,
  //     data.address.neighborhood,
  //     data.address.number,
  //     data.address.zipCode,
  //     city,
  //     data.address.complement,
  //   );

  //   for (const image of data.images) {
  //     images.push(new Image(image));
  //   }

  //   const property = new Property(
  //     data.id,
  //     data.name,
  //     data.type,
  //     data.description,
  //     data.isActive,
  //     data.totalCapacity,
  //     images,
  //     data.latitude,
  //     data.longitude,
  //     data.zipCode,
  //     address,
  //   );

  //   console.log(property);

  //   return property;
  // }
}
