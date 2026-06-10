"use server";
import {
  ReservationClassInterface,
  AccessTokenClassInterface,
} from "@interfaces";
// import { AccessTokenClassInterface } from "../browser/browser.interface";
import * as APIService from "@/modules/api/api.service";
import map from "./mappers/reservation.service.interface.mapper";

// export async function register(form: FormData) {}

export async function get(
  token: AccessTokenClassInterface,
): Promise<ReservationClassInterface[]>;
export async function get(
  token: AccessTokenClassInterface,
  fromProperties: boolean,
): Promise<ReservationClassInterface[]>;
export async function get(
  token: AccessTokenClassInterface,
  fromProperties?: boolean,
): Promise<ReservationClassInterface[]> {
  console.log("reservation.service");
  const url = `reservations${fromProperties ? "/owner" : ""}`;
  console.log(url);

  const res = await APIService.request(url, token);

  const { data } = await res.json();

  // const result: ReservationClassInterface[] | ReservationClassInterface =
  // Array.isArray(data) ? data.map(map) : map(data);

  return data.map(map);
}

// export async function getSpots(
//   token: AccessTokenClassInterface,
//   id: number,
// ): Promise<SpotClassInterface[]> {
//   const res = await APIService.request(`spots/properties/${id}/spots`, token);

//   const { data } = await res.json();

//   return data.map(map);
// }

// export async function generateSpots(id: number, form: FormData) {}

// export async function updateSpotStatus(id: number) {}

// export async function deleteSpot(id: number) {}
