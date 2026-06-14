import {
  AllowedVehiclesTypes,
  ImageClassInterface,
  PropertyClassInterface,
  PropertyStructureInterface,
  SpotApprovalStatus,
  SpotAvailabilityStatus,
  SpotClassInterface,
  SpotStructureInterface,
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
  spots?: Spot[];
  user?: { id: number };

  constructor(i: PropertyStructureInterface) {
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
      address:
        i.location?.address && new Address(i.location?.address as Address),
    };
    if (i.spots) this.setSpots(i.spots as SpotClassInterface[]);
    if (i.user) this.user = { id: i.user.id };
  }

  public setSpots(spots: SpotClassInterface[]): void {
    this.spots = spots.map((spot) => new Spot(spot));
  }
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
      // BUG FIX: timePeriod estava usando datePeriod.end para ambos start e end
      // Corrigido para usar timePeriod.start e timePeriod.end corretamente
      timePeriod: {
        start: i.operatingHours?.timePeriod?.start,
        end: i.operatingHours?.timePeriod?.end,
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

type CityInterface = PropertyClassInterface["location"]["address"]["city"];
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

type StateInterface =
  PropertyClassInterface["location"]["address"]["city"]["state"];
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