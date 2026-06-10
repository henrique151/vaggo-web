// import DatePeriod from "@/classes/data/DatePeriod"
import { DeepPartial } from "@interfaces";

import {
  SpotClassInterface,
  SpotStructureInterface,
  UserStructureInterface,
  VehicleStructureInterface,
} from "@interfaces";
import { UserClassInterface } from "@interfaces";
import { VehicleClassInterface } from "@interfaces";

export type ReservationClassInterface = Reservation;
export type ReservationStructureInterface =
  DeepPartial<ReservationClassInterface>;

interface Reservation {
  id: number;
  status: string;
  code: string;
  info: {
    user: UserClassInterface | UserStructureInterface;
    spot: SpotClassInterface | SpotStructureInterface;
    vehicle: VehicleClassInterface | VehicleStructureInterface;
    date: {
      period: { start: Date; end: Date };
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
