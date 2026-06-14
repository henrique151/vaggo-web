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
import { APIService, PropertyService } from "@services";
import mapSpots from "./mapper/spot/spot.service.interface.mapper";
import map from "./mapper/property.service.interface.mapper";

export async function register(
  token: AccessTokenClassInterface,
  form: FormData,
) {
  try {
    const res = await APIService.request("properties", token, {
      method: "POST",
      body: form,
    });
    const data = await res.json();
    console.log(data);
    // console.log();
    return data;
  } catch (e) {}
}

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

  const result: any =
    data ? (Array.isArray(data) ? data.map(map) : map(data)) : [];

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

export async function generateSpots(
  token: AccessTokenClassInterface,
  id: number,
  form: FormData,
) {
  try {
    const res = await APIService.request(
      `spots/properties/${id}/spots`,
      token,
      {
        method: "POST",
        body: form,
      },
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function updateSpotStatus(
  token: AccessTokenClassInterface,
  id: number,
  status: "DISPONIVEL" | "INDISPONIVEL" | "OCUPADA",
) {
  try {
    const res = await APIService.request(`spots/${id}/status`, token, {
      method: "PATCH",
      body: JSON.stringify({ status: status }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res);
    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

export async function search(params: {
  address?: string;
  cep?: string;
  coordinates?: {
    lat: string;
    lng: string;
  };
  date?: { start: string; end: string };
  radius?: number;
}) {
  const url = new URL(`http://localhost:3000/reservations/search/address`);

  if (params.address) {
    url.searchParams.append("address", params.address);
    if (params.date) {
      url.searchParams.append("startDate", params.date.start);
      url.searchParams.append("endDate", params.date.end);
    }
  }
  if (params.cep) url.searchParams.append("cep", params.cep);

  // if (params.coordinates) throw new Error("Coordinates not implemented");

  try {
    // let uri = url.pathname.replace("/", "");
    // console.log(url.toString());
    const res = await APIService.request(
      url.pathname.replace("/", "").concat(url.search),
    );
    console.log(res);
    const data = await res.json();
    console.log(data);
    // console.log(url.pathname.replace("/", "").concat(url.search));
    // console.log(url.toString());
  } catch (e) {
    console.log(e);
  }
}

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

export async function deleteSpot(
  token: AccessTokenClassInterface,
  propertyId: number,
  id: number,
) {
  try {
    const res = await APIService.genericDeleteRequest(
      token,
      `spots/properties/${propertyId}/spots`,
      id,
    );
    return res;
  } catch (e) {
    console.log(e);
  }
}

export async function editSpot(
  token: AccessTokenClassInterface,
  propertyId: number,
  id: number,
  form: FormData,
) {
  try {
    const res = await APIService.request(
      `spots/properties/${propertyId}/spots/${id}`,
      token,
      {
        method: "PUT",
        body: form,
      },
    );

    console.log(res);
    return await res.ok;
  } catch (e) {
    console.log(e);
  }
}

export async function getAll(token: AccessTokenClassInterface) {
  const data: any = await APIService.genericGetRequest(
    token,
    "admin/properties",
    map,
  );
  // console.log("data");
  // console.log(data);
  return data;
}
