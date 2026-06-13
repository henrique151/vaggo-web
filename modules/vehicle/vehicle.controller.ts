"use server";

import { AccessTokenClassInterface, VehicleClassInterface } from "@interfaces";
import * as VehicleService from "@/modules/vehicle/vehicle.service";
import { Vehicle } from "@classes";
import { ControllerStatus } from "@classes";
import { FormUtils } from "@utils";
import schema from "./vehicle.schemas";

export async function get(
  token: AccessTokenClassInterface,
): Promise<VehicleClassInterface[]>;
export async function get(
  token: AccessTokenClassInterface,
  asAdmin: boolean,
): Promise<VehicleClassInterface[]>;
export async function get(
  token: AccessTokenClassInterface,
  id: number,
): Promise<VehicleClassInterface>;
export async function get(
  token: AccessTokenClassInterface,
  id: number,
  asAdmin?: boolean,
): Promise<VehicleClassInterface>;
export async function get(
  token: AccessTokenClassInterface,
  idOrAll?: boolean | number,
  asAdmin?: boolean,
): Promise<VehicleClassInterface | VehicleClassInterface[]> {
  const id = typeof idOrAll === "number" ? idOrAll : undefined;
  const all = (asAdmin ?? typeof idOrAll === "boolean") ? idOrAll : false;
  // console.log(id);
  console.log("all");
  console.log(all);

  if (all) {
    const data = await VehicleService.getAll(token);
    console.log(data);
    return data;
  } else {
    const data = await VehicleService.get(token, id);
    console.log(data);

    return data;
  }

  // return res;
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

export async function register(
  token: AccessTokenClassInterface,
  form: FormData,
) {
  const status = ControllerStatus.setup(form);

  const res = schema.REGISTER_FORM.safeParse(FormUtils.toObject(form));
  // validate all data
  if (!res.success) {
    status.failed();
    return status.toObject();
  }
  // auth.register(UserObject)
  try {
    const res = await VehicleService.register(token, form);
    console.log(res);
    if (res.ok) {
      const data = await res.json();
      status.successfull(data.data);
    } else {
      const data = await res.json();
      console.log(data);
      status.failed();
    }
    return status.toObject();
  } catch (e) {
    console.log(e);
  }
}
