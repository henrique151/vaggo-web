// import { DataResponse } from "./api";

interface City {
  id: number;
  name: string;
  stateId?: number;
}

interface State {
  id: number;
  name: string;
  uf: string;
}

export interface Address {
  id: number;
  street: string;
  neighborhood: string;
  number: string;
  complement?: string | null;
  zipCode: string;
  cityId?: number;
  city: City;
}
