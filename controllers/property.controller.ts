"use server";
import AccessToken from "@/classes/AccessToken";
import DatePeriod from "@/classes/data/DatePeriod";
import { AccessTokenClassInterface } from "@/interfaces/class/data/AccessToken";
import { PropertyClassInterface } from "@/interfaces/class/property/property";
import { get as getProperty } from "@/services/property.service";

type getPropertyFlags = {
  withSpots?: boolean;
  withReviews?: boolean;
  withReports?: boolean;
};

export async function register(token: AccessToken, form: FormData) {}

/**
 *
 * Return user-owned properties or somebody's else with an ID provided.
 */
export async function get(token: AccessToken): Promise<PropertyClassInterface>;
export async function get(
  token: AccessToken,
  flags: getPropertyFlags,
): Promise<PropertyClassInterface>;
export async function get(
  token: AccessToken,
  id: number,
): Promise<PropertyClassInterface>;
export async function get(
  token: AccessToken,
  id: number,
  flags: getPropertyFlags,
): Promise<PropertyClassInterface>;
export async function get(
  token: AccessToken,
  idOrFlags?: number | getPropertyFlags,
  flags?: getPropertyFlags,
): Promise<PropertyClassInterface> {
  const id = typeof idOrFlags === "number" ? idOrFlags : undefined;
  const flagsParam = flags ?? (idOrFlags as getPropertyFlags);

  const res = await getProperty(token, id);
  // console.log(res);

  // const spots = flagsParam.withSpots && await getSpots(id)
  // const reviews = flagsParam.withReviews && await ReviewService.get()
  // const reports = flagsParam.withReports && await ReportService.get()

  //get reviews, reports and spots with flags
  return res;
}

// public static async getFromUser(token: AccessToken) {

// }

export async function getSpots(id: number) {}

export async function generateSpots(id: number, form: FormData) {}

export async function updateSpotStatus(id: number) {}

export async function deleteSpot(id: number) {}
