"use server";
import { AccessTokenClassInterface, VehicleClassInterface } from "@interfaces";
import * as APIService from "@/modules/api/api.service";
import { FormUtils } from "@utils";
import map from "./mappers/vehicle.service.interface.mapper";
// import { ReportService } from "@services";

export async function getAll(
  token: AccessTokenClassInterface,
): Promise<VehicleClassInterface[]> {
  const data: any = await APIService.genericGetRequest(
    token,
    "admin/vehicles",
    map,
  );
  console.log("data");
  console.log(data);
  return data;
}

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
  const url = `vehicles/${id ?? "my-vehicles"}`;

  // token = AccessTokenClassInterface.fromInterface(token);

  const res = await APIService.request(url, token);

  const data = await res.json();

  // console.log(res);
  const result: VehicleClassInterface[] | VehicleClassInterface = Array.isArray(
    data.data,
  )
    ? data.data.map(map)
    : data.data;

  // const vehicles = data.data.map();
  return result;
}

export async function edit(
  token: AccessTokenClassInterface,
  id: number,
  form: FormData,
) {
  try {
    const formBody = FormUtils.toObject(form);

    const res = await APIService.request(`vehicles/${id}`, token, {
      method: "PUT",
      body: JSON.stringify(formBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    return res.ok;
  } catch (e) {
    console.log(e);
  }
}

export async function deleteById(token: AccessTokenClassInterface, id: number) {
  try {
    const res = await APIService.genericDeleteRequest(token, `vehicles`, id);
    return res;
  } catch (e) {
    console.log(e);
  }
}

export async function register(
  token: AccessTokenClassInterface,
  form: FormData,
) {
  try {
    const res = await APIService.request("vehicles", token, {
      method: "POST",
      body: JSON.stringify(FormUtils.toObject(form)),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const data = await res.json();
    // console.log(data);
    return res;
  } catch (e) {
    console.log(e);
  }
}
// export const VehicleService = {
//   get: getVehicle,
// };
