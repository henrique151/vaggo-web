import { SpotClassInterface } from "@interfaces";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function mapSpots(d: any): SpotClassInterface {
  return {
    id: d.id,
    info: {
      identifier: d.identifier,
      image: {
        url: d.imageUrl,
        file: undefined,
      },
      size: d.size,
      price: d.price,
      allowedVehicles: d.allowedVehicles,
    },
    status: {
      covered: d.isCovered,
      active: d.isActive,
      approval: d.approvalStatus,
      availability: d.status,
      rejectionReason: d.rejectionReason,
    },
    operatingHours: {
      weekdays: d.availability?.id,
      datePeriod: {
        start: d.availability?.startDate,
        end: d.availability?.endDate,
      },
      timePeriod: {
        start: d.availability?.startTime,
        end: d.availability?.endTime,
      },
    },
    property: {
      id: d.propertyId,
      info: {
        name: undefined,
        type: undefined,
        description: undefined,
        totalCapacity: undefined,
        images: undefined,
      },
      status: {
        active: undefined,
      },
      location: {
        latitude: undefined,
        longitude: undefined,
      },
      address: undefined,
    },
  };
}
