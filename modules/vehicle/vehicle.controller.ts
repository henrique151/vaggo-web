"use server";

import { AccessTokenClassInterface, VehicleClassInterface } from "@interfaces";
import * as VehicleService from "@/modules/vehicle/vehicle.service";

export async function get(
  token: AccessTokenClassInterface,
): Promise<VehicleClassInterface[]>;
export async function get(
  token: AccessTokenClassInterface,
  id: number,
): Promise<VehicleClassInterface>;
export async function get(
  token: AccessTokenClassInterface,
  id?: number,
): Promise<VehicleClassInterface | VehicleClassInterface[]> {
  const res: VehicleClassInterface = await VehicleService.get(token, id);

  return res;
}
