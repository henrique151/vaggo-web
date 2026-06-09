"use server";
import AccessToken from "@/classes/AccessToken";
// import UserInterface from "@/interfaces/class/user/user";
import VehicleClassInterface from "@/interfaces/class/vehicle.interface";
import { requestTest } from "./api.service";
import { Vehicle } from "@/classes/vehicle";

export async function getVehicle(
  token: AccessToken,
): Promise<VehicleClassInterface[]>;
export async function getVehicle(
  token: AccessToken,
  id: number,
): Promise<VehicleClassInterface>;
export async function getVehicle(
  token: AccessToken,
  id?: number,
): Promise<VehicleClassInterface | VehicleClassInterface[]> {
  "use server";
  const url = `vehicles/${id ?? "my-vehicles"}`;

  token = AccessToken.fromInterface(token);

  const res = await requestTest(url, token, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function mapper(res: any) {
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
      user: { id: res.userId },
    };
  }
  // console.log(res);
  const result: VehicleClassInterface[] | VehicleClassInterface = Array.isArray(
    data.data,
  )
    ? data.data.map(mapper)
    : data.data;

  // const vehicles = data.data.map();
  return result;
}

// export const VehicleService = {
//   get: getVehicle,
// };
