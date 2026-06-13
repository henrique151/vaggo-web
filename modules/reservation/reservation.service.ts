"use server";
import {
  ReservationClassInterface,
  AccessTokenClassInterface,
} from "@interfaces";
// import { AccessTokenClassInterface } from "../browser/browser.interface";
import * as APIService from "@/modules/api/api.service";
import map from "./mappers/reservation.service.interface.mapper";

export async function register(
  token: AccessTokenClassInterface,
  formData: {
    spotId: number;
    vehicleId: number;
    startDate: string;
    endDate: string;
  },
): Promise<boolean> {
  try {
    const res = await APIService.request("reservations", token, {
      body: JSON.stringify(formData),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res);
    //throw errors if not 200
    // 409 'Já existe uma reserva neste período'
    const data = await res.json();
    console.log(data);

    return res.ok;
  } catch (e) {
    console.log(e);
  }
}

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

export async function changeApprovalStatus(
  token: AccessTokenClassInterface,
  id: number,
  status: "approve" | "reject" | "cancel",
): Promise<boolean> {
  const url = `reservations/${id}/${status}`;

  const res = await APIService.request(url, token, {
    method: "PATCH",
  });
  return res.ok;
}

export async function getAll(token: AccessTokenClassInterface) {
  const res = await APIService.genericGetRequest(
    token,
    "admin/reservations",
    map,
  );
  return res;
}
