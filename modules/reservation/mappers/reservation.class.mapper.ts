import { Property, ReportData, Reservation } from "@classes";
import { ReservationClassInterface } from "@interfaces";

export default function map(d: ReservationClassInterface): Reservation {
  return new Reservation(d);
}
