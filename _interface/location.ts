import { DataResponse } from "./api";

export interface City {
  id: number;
  name: string;
  stateId?: number;
}

export interface State {
  id: number;
  name: string;
  uf: string;
}

export interface Address {
  id: number;
  street: string;
  neighborhood: string;
  number: string;
  complement?: string;
  zipCode: string;
  cityId?: number;
  city: City;
}
