"use server";
import AccessToken from "@/classes/AccessToken";
import DatePeriod from "@/classes/data/DatePeriod";
import { requestTest } from "./api.service";
import {
  PropertyClassInterface,
  PropertyStructureInterface,
} from "@interfaces";

export async function register(form: FormData) {}

export async function get(
  token: AccessToken,
): Promise<PropertyClassInterface[]>;
export async function get(
  token: AccessToken,
  id: number,
): Promise<PropertyClassInterface>;
export async function get(
  token: AccessToken,
  id?: number,
): Promise<PropertyClassInterface | PropertyClassInterface[]> {
  const url = `properties/${id ?? "my-properties"}`;

  const tokenObj = AccessToken.fromInterface(token);
  const res = await requestTest(url, tokenObj, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { data } = await res.json();

  // console.log(data);

  function mapper(data: any): PropertyClassInterface {
    // console.log(data);
    return {
      id: data.id,
      info: {
        name: data.name,
        type: data.type,
        description: data.description,
        totalCapacity: data.totalCapacity,
        images: data.images.map((image) => {
          return { url: image };
        }),
      },
      status: {
        active: data.isActive,
      },
      location: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
      address: {
        id: data.address.id,
        location: {
          street: data.address.street,
          neighborhood: data.address.neighborhood,
          number: data.address.number,
          zipCode: data.address.zipCode,
          complement: data.address.complement,
        },
        city: {
          id: data.address.city.id,
          name: data.address.city.name,
          state: {
            id: data.address.city.stateId,
            name: undefined,
            uf: undefined,
          },
        },
      },
    };
  }

  const result: PropertyClassInterface[] | PropertyClassInterface =
    Array.isArray(data) ? data.map(mapper) : data;

  // const propertyData: PropertyInterface | PropertyInterface[] = Array.isArray(
  //   data.data,
  // )
  //   ? data.data.map(mapper)
  //   : mapper(data.data);

  return result;
}

export async function getSpots(id: number) {}

export async function generateSpots(id: number, form: FormData) {}

export async function updateSpotStatus(id: number) {}

export async function deleteSpot(id: number) {}
