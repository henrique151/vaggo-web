"use server";
import {
  AccessTokenClassInterface,
  ReviewClassInterface as ReviewClassInterface,
} from "@interfaces";
import * as ReviewService from "./review.service";
import { ControllerStatus } from "@classes";

export async function get(
  token: AccessTokenClassInterface,
): Promise<ReviewClassInterface[]>;
export async function get(
  token: AccessTokenClassInterface,
  type: "property" | "spot",
  id: number,
): Promise<ReviewClassInterface[]>;
export async function get(
  token: AccessTokenClassInterface,
  type?: "property" | "spot",
  id?: number,
): Promise<ReviewClassInterface[]> {
  const res = await ReviewService.get(token, type, id);

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
    const res = await ReviewService.edit(token, id, form);
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
    const res = await ReviewService.deleteById(token, id);
    if (res) status.successfull();
    else status.failed();
    return status.toObject();
  } catch (e) {
    console.log(e);

    status.failed();
    return status.toObject();
  }
}
