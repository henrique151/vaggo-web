import { DeepPartial } from "../types";
import ImageInterface from "./data/image.interface";
import { PropertyClassInterface, SpotClassInterface } from "./property";
import { UserClassInterface } from "./user.interface";

export type ReportClassInterface = Report;
export type ReportStructureInterface = DeepPartial<Report>;

interface Report {
  id: number;
  info: {
    description: string;
    status: string;
    reason: string;
    adminNote: string;
    images: ImageInterface;
  };
  target: {
    id: number;
    type: string;
  };
  date: {
    created: Date;
    updated: Date;
    reviewed: Date;
  };
  reporter: UserClassInterface;
  reported: UserClassInterface;
  spot?: SpotClassInterface;
}

// {
//// 			"id": 1,
// 	//		"description": "Linguagem ofensiva",
// 	//		"reason": "Linguagem ofensiva",
// 	//		"status": "PENDENTE",
// 	//		"adminNote": null,
// 			"userId": 1,
// 			"spotId": 1,
// 	//		"reportedUserId": 1,
// 	//		"targetType": "SPOT",
// 	//		"targetId": 1,
// 	//		"images": [
// 				"https://res.cloudinary.com/dabf2vbrl/image/upload/v1779558627/vaggo/users/user_1/reports/report_img_0_1779558627227.jpg"
// 			],
// 	//		"createdAt": "2026-05-23T17:50:28.491Z",
// 	//		"updatedAt": "2026-05-23T17:50:28.491Z",
// 	//		"reviewedAt": null,
// 			"USU_INT_ID": 1,
// 			"VAG_INT_ID": 1,
// 	//		"reporter": {
// 				"id": 1,
// 				"email": "fateczl.dsm@gmail.com",
// 				"avatarUrl": "https://res.cloudinary.com/dabf2vbrl/image/upload/v1779495884/vaggo/users/user_1/avatarUrl/avatar_1.jpg"
// 			},
// 	//		"spot": {
// 				"id": 1,
// 				"identifier": "Vaga-A1",
// 				"status": "DISPONIVEL",
// 				"isActive": true,
// 				"propertyId": 1,
// 				"property": {
// 					"id": 1,
// 					"name": "Casa Nova"
// 				}
// 			}
// 		}
