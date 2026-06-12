"use server";
import { AccessTokenClassInterface, VehicleClassInterface } from "@interfaces";
import * as APIService from "@/modules/api/api.service";
import { FormUtils } from "@utils";
// import { ReportService } from "@services";

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
