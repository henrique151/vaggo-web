import { Address } from "./location";
import { Image } from "./media";
import { Spot } from "./spot";

export interface Property {
  id: number;
  name: string;
  type: string | "Residencial" | "Comercial";
  description: string;
  isActive: boolean;
  totalCapacity: number;
  images: Image[];
  latitude: string;
  longitude: string;
  addressId?: number;
  zipCode: string;
  address: Address;
  spots?: Spot[];
}
