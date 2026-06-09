// import DatePeriod from "@/classes/data/DatePeriod"
import { DeepPartial } from "../types";
import { SpotClassInterface } from "./property";
import { UserClassInterface } from "./user.interface";
import { VehicleClassInterface } from "./vehicle.interface";

export type ReservationClassInterface = Reservation;
export type ReservationStructureInterface =
  DeepPartial<ReservationClassInterface>;

interface Reservation {
  id: number;
  status: string;
  code: string;
  info: {
    user: UserClassInterface;
    spot: SpotClassInterface;
    vehicle: VehicleClassInterface;
    date: {
      period: Date;
    };
  };
}

// {
// 			"id": 1,
// //			"spotId": 1,
// //			"vehicleId": 1,
// //			"userId": 1,
// //			"startDate": "2026-01-01",
// //			"endDate": "2026-05-10",
// //			"status": "APROVADA",
// //			"code": "4861052D",
// //			"VAG_INT_ID": 1,
// //			"VEI_INT_ID": 1,
// //			"USU_INT_ID": 1,
// //			"spot": {
// 				"id": 1,
// 				"identifier": "Vaga-A1",
// 				"price": "20.00",
// 				"property": {
// 					"name": "Casa Nova"
// 				}
// 			},
// //			"vehicle": {
// 				"brand": "Honda",
// 				"model": "CB 500",
// 				"licensePlate": "XYA2B36"
// 			}
// 		}
