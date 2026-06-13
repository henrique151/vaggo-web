import { VehicleClassInterface, VehicleStructureInterface } from "@interfaces";

export default function map(res: any): VehicleStructureInterface {
  // console.log("resCar");
  // console.log(res);
  return {
    id: res.id,
    brand: res.brand,
    model: res.model,
    color: res.color,
    licensePlate: res.licensePlate,
    manufactureYear: res.manufactureYear,
    type: res.type,
    size: res.size,
    active: res.isActive,
    user: {
      id: res.userId ?? res.user?.id,
      email: res.user?.email,
      person: {
        name: res.user?.person?.name,
      },
    },
  };
}
