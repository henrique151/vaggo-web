"use server";
// import AccessTokenClassInterface from "@/classes/AccessToken";
import DatePeriod from "@/classes/data/DatePeriod";
// import { requestTest } from "../../services/api.service";
import {
  PropertyClassInterface,
  SpotClassInterface,
  AccessTokenClassInterface,
  // PropertyStructureInterface,
} from "@interfaces";
import { APIService } from "@services";
import mapSpots from "./mapper/spot/spot.service.interface.mapper";
import map from "./mapper/property.service.interface.mapper";

export async function register(form: FormData) {}

export async function get(
  token: AccessTokenClassInterface,
): Promise<PropertyClassInterface[]>;
export async function get(
  token: AccessTokenClassInterface,
  id: number,
): Promise<PropertyClassInterface>;
export async function get(
  token: AccessTokenClassInterface,
  id?: number,
): Promise<PropertyClassInterface | PropertyClassInterface[]> {
  const url = `properties/${id ?? "my-properties"}`;
  console.log(url);
  // const tokenObj = AccessTokenClassInterface.fromInterface(token);
  const res = await APIService.request(url, token);

  const { data } = await res.json();

  // console.log(data);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // function mapper(data: any): PropertyClassInterface {
  //   // console.log(data);
  //   return {
  //     id: data.id,
  //     info: {
  //       name: data.name,
  //       type: data.type,
  //       description: data.description,
  //       totalCapacity: data.totalCapacity,
  //       images: data.images.map((image) => {
  //         return { url: image };
  //       }),
  //     },
  //     status: {
  //       active: data.isActive,
  //     },
  //     location: {
  //       latitude: data.latitude,
  //       longitude: data.longitude,
  //       address: {
  //         id: data.address.id,
  //         location: {
  //           street: data.address.street,
  //           neighborhood: data.address.neighborhood,
  //           number: data.address.number,
  //           zipCode: data.address.zipCode,
  //           complement: data.address.complement,
  //         },
  //         city: {
  //           id: data.address.city.id,
  //           name: data.address.city.name,
  //           state: {
  //             id: data.address.city.stateId,
  //             name: undefined,
  //             uf: undefined,
  //           },
  //         },
  //       },
  //     },
  //   };
  // }

  const result: PropertyClassInterface[] | PropertyClassInterface =
    Array.isArray(data) ? data.map(map) : map(data);

  // const propertyData: PropertyInterface | PropertyInterface[] = Array.isArray(
  //   data.data,
  // )
  //   ? data.data.map(mapper)
  //   : mapper(data.data);

  return result;
}

export async function getSpots(
  token: AccessTokenClassInterface,
  id: number,
): Promise<SpotClassInterface[]> {
  const res = await APIService.request(`spots/properties/${id}/spots`, token);

  const { data } = await res.json();

  return data.map(mapSpots);
}

export async function generateSpots(id: number, form: FormData) {}

export async function updateSpotStatus(id: number) {}

export async function deleteSpot(id: number) {}

export async function search() {}

export async function edit(
  token: AccessTokenClassInterface,
  id: number,
  form: FormData,
) {
  try {
    const res = await APIService.request(`properties/${id}`, token, {
      method: "PUT",
      body: form,
    });

    return await res.ok;
  } catch (e) {
    console.log(e);
  }
}

export async function deleteById(token: AccessTokenClassInterface, id: number) {
  try {
    const res = await APIService.genericDeleteRequest(token, `properties`, id);
    return res;
  } catch (e) {
    console.log(e);
  }
}
