"use server";
// import AccessTokenClassInterface from "@/classes/AccessToken";
import DatePeriod from "@/classes/data/DatePeriod";
import * as PropertyService from "@/modules/property/property.service";

import { AccessTokenClassInterface, PropertyClassInterface } from "@interfaces";

type getPropertyFlags = {
  withSpots?: boolean;
  withReviews?: boolean;
  withReports?: boolean;
};

export async function register(
  token: AccessTokenClassInterface,
  form: FormData,
) {}

/**
 *
 * Return user-owned properties or somebody's else with an ID provided.
 */
export async function get(
  token: AccessTokenClassInterface,
): Promise<PropertyClassInterface[]>;
export async function get(
  token: AccessTokenClassInterface,
  flags: getPropertyFlags,
): Promise<PropertyClassInterface[]>;
export async function get(
  token: AccessTokenClassInterface,
  id: number,
): Promise<PropertyClassInterface>;
export async function get(
  token: AccessTokenClassInterface,
  id: number,
  flags: getPropertyFlags,
): Promise<PropertyClassInterface>;
export async function get(
  token: AccessTokenClassInterface,
  idOrFlags?: number | getPropertyFlags,
  flags?: getPropertyFlags,
): Promise<PropertyClassInterface | PropertyClassInterface> {
  console.log("controller");
  console.log(idOrFlags);
  const id =
    Number.isNaN(idOrFlags as number) == false
      ? (idOrFlags as number)
      : undefined;

  const flagsParam = flags ?? (idOrFlags as getPropertyFlags);
  console.log(id);

  const res = await PropertyService.get(token, id);
  // console.log(res);

  // const spots = flagsParam.withSpots && await getSpots(id)
  // const reviews = flagsParam.withReviews && await ReviewService.get()
  // const reports = flagsParam.withReports && await ReportService.get()

  //get reviews, reports and spots with flags
  return res;
}

// public static async getFromUser(token: AccessToken) {

// }

export async function getSpots(token: AccessTokenClassInterface, id: number) {
  const res = await PropertyService.getSpots(token, id);
  return res;
}

export async function generateSpots(id: number, form: FormData) {}

export async function updateSpotStatus(id: number) {}

export async function deleteSpot(id: number) {}
