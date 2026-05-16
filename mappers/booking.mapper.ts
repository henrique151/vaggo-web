import { Booking } from "@/classes/booking";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function map(d: any) {
  return new Booking(d);
}
