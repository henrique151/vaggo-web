import { DeepPartial } from "@/interfaces/types";
import ImageInterface from "./data/image.interface";

export type PropertyStructureInterface = DeepPartial<PropertyClassInterface>;
export type PropertyClassInterface = Property;

export type SpotClassInterface = Spot;
export type SpotStructureInterface = DeepPartial<Spot>;

export type SpotAvailabilityStatus = string | "DISPONÍVEL" | "PENDENTE";
export type AllowedVehiclesTypes = "CARRO" | "MOTO";
export type SpotApprovalStatus = string | "APROVADA";

export interface Property {
  id: number;
  info: {
    name: string;
    type: string;
    description: string;
    totalCapacity: number;
    images: ImageInterface[];
  };
  status: {
    active: boolean;
  };
  location: {
    latitude: string;
    longitude: string;
  };
  address: Address;
  spots?: Spot[];
}

interface Spot {
  id: number;
  info: {
    identifier: string;
    image: ImageInterface;
    size: string;
    price: string;
    allowedVehicles: AllowedVehiclesTypes[];
  };
  status: {
    covered: boolean;
    active: boolean;
    approval: SpotApprovalStatus;
    availability: SpotAvailabilityStatus;
  };
  operatingHours: {
    weekdays: number;
    datePeriod: {
      start: string;
      end: string;
    };
    timePeriod: {
      start: string;
      end: string;
    };
  };
  property?: PropertyClassInterface;
}

interface Address {
  id: number;
  location: {
    street: string;
    neighborhood: string;
    number: string;
    zipCode: string;
    complement?: string;
  };
  city: City;
}

interface City {
  id: number;
  name: string;
  state: State;
}

interface State {
  id: number;
  name: string;
  uf: string;
}
