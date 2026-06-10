import {
  AccessTokenClassInterface,
  ReservationClassInterface,
} from "@interfaces";
import * as ReservationService from "@/modules/reservation/reservation.service";

/**
 *
 * Returns Reservations as user or from owned properties
 */
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
  console.log(token);
  const res = await ReservationService.get(token, fromProperties);
  // console.log(res);

  // const spots = flagsParam.withSpots && await getSpots(id)
  // const reviews = flagsParam.withReviews && await ReviewService.get()
  // const reports = flagsParam.withReports && await ReportService.get()

  //get reviews, reports and spots with flags
  return res;
}
