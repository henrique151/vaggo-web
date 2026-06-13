import {
  AccessTokenClassInterface,
  ReservationClassInterface,
} from "@interfaces";
import * as ReservationService from "@/modules/reservation/reservation.service";

export async function getAll(token: AccessTokenClassInterface) {
  const res = await ReservationService.getAll(token);
  return res;
}

export async function register(
  token: AccessTokenClassInterface,
  form: FormData,
): Promise<boolean> {
  const data = {
    spotId: Number(form.get("spotId")),
    vehicleId: Number(form.get("vehicleId")),
    startDate: String(form.get("startDate")),
    endDate: String(form.get("endDate")),
  };

  const res: boolean = await ReservationService.register(token, data);

  console.log(res);
  return res;
}

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

export async function changeApprovalStatus(
  token: AccessTokenClassInterface,
  id: number,
  status: "approve" | "reject" | "cancel",
): Promise<boolean> {
  const res = await ReservationService.changeApprovalStatus(token, id, status);
  return res;
}
