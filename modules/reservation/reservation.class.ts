import { Spot, User, Vehicle } from "@classes";
import {
  ReservationClassInterface,
  ReservationStructureInterface,
} from "@interfaces";

export class Reservation implements ReservationClassInterface {
  id: number;
  status: string;
  code: string;
  info: {
    user: User;
    spot: Spot;
    vehicle: Vehicle;
    date: { period: { start: Date; end: Date } };
  };

  constructor(i: ReservationStructureInterface) {
    this.id = i.id;
    this.status = i.status;
    this.code = i.code;
    this.info = {
      user: i.info?.user && new User(i.info.user),
      spot: i.info?.spot && new Spot(i.info.spot),
      vehicle: i.info?.vehicle && new Vehicle(i.info.vehicle),
      date: {
        period: {
          start:
            i.info?.date?.period?.start &&
            new Date(i.info.date.period.start as Date),
          end:
            i.info?.date?.period?.end &&
            new Date(i.info.date.period.end as Date),
        },
      },
    };
  }
}
