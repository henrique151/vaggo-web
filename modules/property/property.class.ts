import {
  AllowedVehiclesTypes,
  ImageClassInterface,
  // Property,
  PropertyClassInterface,
  PropertyStructureInterface,
  SpotApprovalStatus,
  SpotAvailabilityStatus,
  SpotClassInterface,
  SpotStructureInterface,
  // VehicleClassInterface,
} from "@interfaces";

export class Property implements PropertyClassInterface {
  id: number;
  info: {
    name: string;
    type: string;
    description: string;
    totalCapacity: number;
    images: ImageClassInterface[];
  };
  status: { active: boolean };
  location: { latitude: string; longitude: string; address: Address };
  // address: Address;
  spots?: Spot[];

  constructor(i: PropertyStructureInterface) {
    console.log(i);
    this.id = i.id;
    this.info = {
      name: i.info?.name,
      type: i.info?.type,
      description: i.info?.description,
      totalCapacity: i.info?.totalCapacity,
      images: i.info?.images as unknown as ImageClassInterface[],
    };
    this.status = { active: i.status?.active };
    this.location = {
      latitude: i.location?.latitude,
      longitude: i.location?.longitude,
      address: i.location?.address && new Address(i.location.address),
    };
    // this.address = new Address(this.address);
    // this.spots = this.spots && this.setSpots(this.spots);
    if (i.spots) this.setSpots(i.spots as SpotClassInterface[]);
  }

  public setSpots(spots: SpotClassInterface[]): void {
    this.spots = spots.map((spot) => {
      return new Spot(spot);
    });
  }

  // public isCompatibleWithVehicles(vehicles: Vehicle[]) {

  // }
}

export class Spot implements SpotClassInterface {
  id: number;
  info: {
    identifier: string;
    image: ImageClassInterface;
    size: string;
    price: string;
    allowedVehicles: AllowedVehiclesTypes[];
  };
  status: {
    covered: boolean;
    active: boolean;
    approval: SpotApprovalStatus;
    availability: SpotAvailabilityStatus;
    rejectionReason: string;
  };
  operatingHours: {
    weekdays: number;
    datePeriod: { start: string; end: string };
    timePeriod: { start: string; end: string };
  };
  property?: Property;
  constructor(i: SpotStructureInterface) {
    this.id = i.id;
    this.info = {
      identifier: i.info?.identifier,
      image: i.info?.image as ImageClassInterface,
      size: i.info?.size,
      price: i.info?.price,
      allowedVehicles: i.info?.allowedVehicles,
    };
    this.status = {
      covered: i.status?.covered,
      active: i.status?.active,
      approval: i.status?.approval,
      availability: i.status?.availability,
      rejectionReason: i.status?.rejectionReason,
    };
    this.operatingHours = {
      weekdays: i.operatingHours?.weekdays,
      datePeriod: {
        start: i.operatingHours?.datePeriod?.start,
        end: i.operatingHours?.datePeriod?.end,
      },
      timePeriod: {
        start: i.operatingHours?.datePeriod?.end,
        end: i.operatingHours?.datePeriod?.end,
      },
    };
    this.property = i.property && new Property(i.property);
  }
}

type AddressInterface = PropertyClassInterface["location"]["address"];
class Address implements AddressInterface {
  id: number;
  location: {
    street: string;
    neighborhood: string;
    number: string;
    zipCode: string;
    complement?: string;
  };
  city: CityInterface;
  constructor(i: AddressInterface) {
    this.id = i.id;
    this.location = {
      street: i.location.street,
      neighborhood: i.location.neighborhood,
      number: i.location.number,
      zipCode: i.location.zipCode,
      complement: i.location.complement,
    };
    this.city = new City(i.city);
  }
}

type CityInterface = PropertyClassInterface["address"]["city"];
class City implements CityInterface {
  id: number;
  name: string;
  state: StateInterface;
  constructor(i: CityInterface) {
    this.id = i.id;
    this.name = i.name;
    this.state = new State(i.state);
  }
}

type StateInterface = PropertyClassInterface["address"]["city"]["state"];
class State implements StateInterface {
  id: number;
  name: string;
  uf: string;
  constructor(i: StateInterface) {
    this.id = i.id;
    this.name = i.name;
    this.uf = i.uf;
  }
}
