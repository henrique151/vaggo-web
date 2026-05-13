/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import {
  Address as IAddress,
  City as ICity,
  State as IState,
} from "@/interface/location";
import { Image } from "@/interface/media";
import { Property as IProperty } from "@/interface/property";
import * as api from "./api";
import { Spot, SpotDAO } from "./spot";
import { useApi } from "./useApi";
import { useEffect, useState } from "react";
import { useUser } from "./user";
import { DatePeriod } from "@/interface/entity";

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
  public static fromRawData(data: any, stateList: State[]): Property {
    data.images = Image.createFromList(data.images);

    data.address.city.state = State.getFromList(
      data.address.city.stateId,
      stateList,
    );

    data.address.city = new City(data.address.city);

    data.address = new Address(data.address);

    return new Property(data);
  }

  public static create(
    data: IProperty & { images: string[] },
    states: IState[],
  ): Property | undefined {
    const images = [];
    let state: State | undefined;
    // let city: City | undefined;

    if (states) {
      const found = states.find(
        (state) => state.id == data.address.city.stateId,
      );
      if (!found) return undefined;
      state = new State(found.id, found.name, found.uf);
    } else {
      // state = states.find((state) => state.id == data.address.city.stateId);
    }

    if (!state) return undefined;

    const city = new City(data.address.city.id, data.address.city.name, state);

    const address = new Address(
      data.address.id,
      data.address.street,
      data.address.neighborhood,
      data.address.number,
      data.address.zipCode,
      city,
      data.address.complement,
    );

    for (const image of data.images) {
      images.push(new Image(image));
    }

    const property = new Property(
      data.id,
      data.name,
      data.type,
      data.description,
      data.isActive,
      data.totalCapacity,
      images,
      data.latitude,
      data.longitude,
      data.zipCode,
      address,
    );

    console.log(property);

    return property;
  }
}

export class PropertyDAO {
  public static async get(
    id: number,
    withSpots?: boolean,
  ): Promise<Property | undefined> {
    //throw error when parts get strange
    const res = (await api.call(`properties/${id}`, true, {
      dataOnly: true,
    })) as Property & { images: string[] };

    const states = (await api.call("locations/states", false, {
      dataOnly: true,
    })) as IState[];

    const property = Property.create(res, states);

    // if (!property) return undefined;

    if (withSpots && property)
      property.spots = await SpotDAO.listFromProperty(id);

    return property;

    // const images = [];
    // let state: State | undefined;

    // if (!res && !states) return undefined;

    // for (const curState of states) {
    //   if (curState.id == res.address.city.stateId) {
    //     state = new State(curState.id, curState.name, curState.uf);
    //     break;
    //   }
    // }

    // if (!state) return undefined;

    // const city = new City(res.address.city.id, res.address.city.name, state);

    // const address = new Address(
    //   res.address.id,
    //   res.address.street,
    //   res.address.neighborhood,
    //   res.address.number,
    //   res.address.zipCode,
    //   city,
    //   res.address.complement,
    // );

    // for (const image of res.images) {
    //   images.push(new Image(image));
    // }

    // const property = new Property(
    //   res.id,
    //   res.name,
    //   res.type,
    //   res.description,
    //   res.isActive,
    //   res.totalCapacity,
    //   images,
    //   res.latitude,
    //   res.longitude,
    //   res.zipCode,
    //   address,
    // );

    // return property;

    // return undefined;
  }

  public static async getFromUser(): Promise<Property[] | []> {
    const res = (await api.call(`properties/my-properties`, true, {
      dataOnly: true,
    })) as Property[] & { images: string[] };

    const states = (await api.call("locations/states", false, {
      dataOnly: true,
    })) as IState[];

    const properties: Property[] = [];

    if (!res && !states) return properties;

    for (const property of res) {
      const obj = Property.create(
        property as Property & { images: string[] },
        states,
      );
      if (!obj) return properties;
      properties.push(obj);
    }

    console.log(properties);

    return properties;
  }

  public static async search(params: {
    address?: string;
    startDate?: string;
    endDate?: string;
    cep?: string;
  }): Promise<PropertySearchResult | undefined> {
    let mainUrl = "http://localhost:3000/reservations/search/address";

    for (const [key, value] of Object.entries(params)) {
      mainUrl += `?${key}=${value}`;
    }
    console.log(mainUrl);

    const res = await fetch(mainUrl, {
      method: "GET",
    });

    if (!res) return undefined;

    const data = (await res.json()) as PropertySearchResult;

    for (const result of data.results) {
      const property = await PropertyDAO.get(result.propertyId);
      if (!property) return undefined;
      result.images = new Image(property.images[0].url);
    }

    return data;
  }
}

export function useFetchStates(): [states: State[], loading: boolean] {
  const [data, dataLoading] = useApi({
    uri: `locations/states`,
    dataOnly: true,
    useToken: true,
    req: { method: "GET" },
  });
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      const instances: State[] = [];

      for (const state of data) {
        instances.push(new State(state));
      }

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStates(instances);
      setLoading(false);
    }
  }, [data]);

  return [states, loading];
}

export function useFetchProperty({
  id,
}: {
  id: number;
}): [property: Property | undefined, loading: boolean] {
  const [data, dataLoading] = useApi({
    uri: `locations/${id}`,
    dataOnly: true,
    useToken: true,
    req: { method: "GET" },
  });
  const [stateData, stateDataLoading] = useFetchStates();

  const [property, setProperty] = useState<Property | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data && stateData) {
      const property = Property.fromRawData(data, stateData);

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProperty(property);
      setLoading(false);
    }
  }, [data, stateData]);

  return [property, loading];
}

export function useFetchUserProperties(): [
  properties: Property[] | undefined,
  loading: boolean,
] {
  const [data, dataLoading] = useApi({
    uri: `properties/my-properties`,
    dataOnly: true,
    useToken: true,
    req: { method: "GET" },
  });

  const [stateData, stateDataLoading] = useFetchStates();

  // const [user, userLoading] = useUser({
  //   id: Number(localStorage.getItem("userId")),
  // });

  const [properties, setSolicitaions] = useState<Property[] | undefined>(
    undefined,
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data && stateData) {
      const instances = data.map((property: any) => {
        // public address: IAddress;
        // public spots ?: Spot[];

        property.images = Image.createFromList(property.images);

        property.address.city.state = State.getFromList(
          property.address.city.stateId,
          stateData,
        );

        property.address.city = new City(property.address.city);

        property.address = new Address(property.address);

        new Property(property);
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSolicitaions(instances);
      setLoading(false);
    }
  }, [data, stateData]);

  // useEffect(() => {
  // }, [data]);

  return [properties, loading];
}

export function useSearchProperties({
  address,
  datePeriod,
  cep,
}: {
  address: string;
  datePeriod?: DatePeriod;
  cep?: string;
}): [result: SearchResult | undefined, loading: boolean] {
  let uri = `reservations/search/address`;

  uri = uri.concat(`?address=${address}`);

  // console.log(uri);

  if (datePeriod) {
    const dateString = datePeriod.toString();
    uri.concat(`&startDate=${dateString.start}&endDate=${dateString.end}`);
  }

  const [data, dataLoading] = useApi({
    uri: uri,
    dataOnly: false,
    useToken: true,
    req: { method: "GET", headers: { "Content-Type": "application/json" } },
  });
  const [stateData, stateDataLoading] = useFetchStates();

  const [result, setResult] = useState<SearchResult | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log("result from search: ");
    // console.log(data, stateData);
    if (data && stateData) {
      console.log("hello! inserting data");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResult(new SearchResult(data));
      setLoading(false);
    }
  }, [data, stateData]);

  return [result, loading];
}

export class SearchResult {
  public origin: {
    latitude: string;
    longitude: string;
    query: string;
    source: string;
  };
  public results: {
    // property: Property;
    spots: {
      id: number;
      identifier: string;
      covered: string;
      price: string;
      allowedVehicles: string[];
      status: string;
    };
    latitude: string;
    longitude: string;
    route: {
      duration: string;
      distance: string;
      durationNum: number;
      distanceMeters: number;
    };
  }[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    this.origin = {
      latitude: data.searchOrigin.lat,
      longitude: data.searchOrigin.lng,
      query: data.searchOrigin.query,
      source: data.searchOrigin.source,
    };
    for (const result of data.results) {
      console.log(result);
      this.results.push({
        // property: result.property,
        spots: {
          id: result.spotId,
          identifier: result.identifier,
          covered: result.isCovered,
          price: result.price,
          allowedVehicles: result.allowedVehicles,
          status: result.currentStatus,
        },
        latitude: result.propertyLat,
        longitude: result.propertyLng,
        route: {
          duration: result.route.durationText,
          distance: result.route.distanceText,
          durationNum: result.route.durationMinutes,
          distanceMeters: result.route.distanceMeters,
        },
      });
    }
  }
}

export interface PropertySearchResult {
  success: boolean;
  searchOrigin: SearchOrigin;
  requestedRadiusKm: number;
  requestedPeriod: null | string | number; // Adjust based on expected period type
  fallbackToNearest: boolean;
  total: number;
  results: SearchResult[];
}

export interface SearchOrigin {
  lat: number;
  lng: number;
  query: string;
  source: string;
}

// export interface SearchResult {
//   spotId: number;
//   identifier: string;
//   size: string; // Keep as string if it represents a decimal/price format
//   isCovered: boolean;
//   price: string;
//   allowedVehicles: string[]; //CARRO | MOTO
//   currentStatus: "DISPONIVEL" | "OCUPADO" | string;
//   propertyId: number;
//   propertyName: string;
//   propertyLat: string;
//   propertyLng: string;
//   weekdaysBitmask: number;
//   availableFrom: string; // ISO Date format
//   availableUntil: string;
//   timeStart: string;
//   timeEnd: string;
//   distanceKm: number;
//   weekdays: string[];
//   images: any;
//   route: RouteDetails;
//   withinRequestedRadius: boolean;
// }

export interface RouteDetails {
  durationText: string;
  distanceText: string;
  durationMinutes: number;
  distanceMeters: number;
}

class Address {
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
    this.city = data.city;
    this.complement = data.complement;
  }
}

class City implements ICity {
  public id: number;
  public name: string;
  public state: State;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.state = data.state;
  }
}

class State {
  public id: number;
  public name: string;
  public uf: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.uf = data.uf;
  }

  public static getFromList(id: number, list: State[]) {
    for (const state of list) {
      if (state.id == id) {
        return state;
      }
    }
  }
}
