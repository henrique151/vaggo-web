import {
  Address as IAddress,
  City as ICity,
  State as IState,
} from "@/interface/location";
import { Image } from "@/interface/media";
import { Property as IProperty } from "@/interface/property";
import * as api from "./api";

export default class Property implements IProperty {
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public description: string,
    public isActive: boolean,
    public totalCapacity: number,
    public images: Image[],
    public latitude: string,
    public longitude: string,
    public zipCode: string,
    public address: IAddress,
  ) {}

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
  public static async get(id: number): Promise<Property | undefined> {
    //throw error when parts get strange
    const res = (await api.call(`properties/${id}`, true, {
      dataOnly: true,
    })) as Property & { images: string[] };

    const states = (await api.call("locations/states", false, {
      dataOnly: true,
    })) as IState[];

    return Property.create(res, states);

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
}

class Address implements IAddress {
  constructor(
    public id: number,
    public street: string,
    public neighborhood: string,
    public number: string,
    public zipCode: string,
    public city: City,
    public complement?: string,
  ) {}
}

class City implements ICity {
  constructor(
    public id: number,
    public name: string,
    public state: State,
  ) {}
}

class State implements IState {
  constructor(
    public id: number,
    public name: string,
    public uf: string,
  ) {}
}
