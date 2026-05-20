import DatePeriod from "@/classes/data/DatePeriod";
import { Spot } from "./spot";
import User from "./user";

export class Booking {
  id: number;
  spot: Spot;
  vehicle: object;
  user?: User;
  datePeriod: DatePeriod;
  status: string;
  code: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    this.id = data.id;
    this.datePeriod = new DatePeriod(
      new Date(data.startDate),
      new Date(data.endDate),
    );
    this.status = data.status;
    this.code = data.code;
    this.spot = data.spot;
    this.vehicle = data.vehicle;
    this.user = data.user;
  }

  // isActive(): boolean {
  //   const now = new Date();
  //   return now >= this.startDate && now <= this.endDate;
  // }

  // getFormattedPrice(): string {
  //   return `$${parseFloat(this.spot.price).toFixed(2)}`;
  // }
}
