"use server";

import { AccessTokenClassInterface, VehicleClassInterface } from "@interfaces";
import * as VehicleService from "@/modules/vehicle/vehicle.service";
import { Vehicle } from "@/classes/vehicle";
import { ControllerStatus } from "@classes";

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

export async function edit(
  token: AccessTokenClassInterface,
  form: FormData,
  idParam?: number,
) {
  const id = idParam ?? Number(form.get("id"));
  const status = ControllerStatus.setup(form);

  if (form.get("id")) form.delete("id");

  try {
    const res = await VehicleService.edit(token, id, form);
    if (res) status.successfull();
    else status.failed();
  } catch (e) {
    console.log(e);
    status.failed();
  }
  return status.toObject();
}

export async function deleteById(token: AccessTokenClassInterface, id: number) {
  const status = ControllerStatus.setup();

  try {
    const res = await VehicleService.deleteById(token, id);
    if (res) status.successfull();
    else status.failed();
    return status.toObject();
  } catch (e) {
    console.log(e);

    status.failed();
    return status.toObject();
  }
}
