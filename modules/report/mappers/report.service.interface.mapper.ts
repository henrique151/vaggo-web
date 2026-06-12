import { ReportClassInterface } from "@interfaces";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function map(d: any): ReportClassInterface {
  return {
    id: d.id,
    info: {
      description: d.description,
      status: d.status,
      reason: d.reason,
      adminNote: d.adminNote,
      images: d.images.map((image) => {
        return { url: image };
      }),
    },
    target: {
      id: d.targetId,
      type: d.targetType,
    },
    date: {
      created: d.createdAt,
      updated: d.updatedAt,
      reviewed: d.reviewdAt,
    },
    reporter: {
      id: d.reporter?.id,
      email: d.reporter?.email,
      avatar: { url: d.reporter?.avatarUrl },
      lastTime: undefined,
      permissionLevel: "1",
      status: undefined,
      person: undefined,
    },
    reported: {
      id: d.reportedUserId,
      email: "",
      avatar: undefined,
      lastTime: undefined,
      permissionLevel: "1",
      status: undefined,
      person: undefined,
    },
    spot: {
      id: d.spot?.id,
      info: {
        identifier: d.spot?.identifier,
        image: undefined,
        size: "",
        price: "",
        allowedVehicles: [],
      },
      status: {
        active: d.spot?.isActive,
        availability: d.spot?.status,
        covered: false,
        approval: "",
        rejectionReason: "",
      },
      property: {
        id: d.spot?.property?.id,
        info: {
          name: d.spot?.property?.name,
          type: "",
          description: "",
          totalCapacity: 0,
          images: [],
        },
        status: {
          active: false,
        },
        location: {
          latitude: "",
          longitude: "",
          address: undefined,
        },
      },
      operatingHours: {
        weekdays: 0,
        datePeriod: {
          start: "",
          end: "",
        },
        timePeriod: {
          start: "",
          end: "",
        },
      },
    },
  };
}

// "id": 2,
// 			"identifier": "Vaga-A1",
// 			"status": "DISPONIVEL",
// 			"isActive": true,
// 			"propertyId": 1,
// 			"property": {
// 				"id": 1,
// 				"name": "Casa Nova"
// 			}
