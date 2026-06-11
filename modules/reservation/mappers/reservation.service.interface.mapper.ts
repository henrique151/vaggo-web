import { ReservationClassInterface, SpotStructureInterface } from "@interfaces";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function map(d: any): ReservationClassInterface {
  return {
    id: d.id,
    status: d.status,
    code: d.code,
    info: {
      user: {
        id: d.userId,
      },
      spot: {
        id: d.spot?.id,
        info: { identifier: d.spot?.identifier, price: d.spot?.price },
        property: { info: { name: d.spot?.property?.name } },
      } as SpotStructureInterface,
      vehicle: {
        brand: d.vehicle?.brand,
        model: d.vehicle?.model,
        licensePlate: d.vehicle?.licensePlate,
      },
      date: {
        period: { start: d.startDate, end: d.endDate },
      },
    },
  };
}
