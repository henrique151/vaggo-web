"use server";
import * as APIService from "@/modules/api/api.service";
import { AccessTokenClassInterface, ReportClassInterface } from "@interfaces";
import map from "./mappers/report.service.interface.mapper";

export async function register(
  token: AccessTokenClassInterface,
  form: FormData,
): Promise<boolean> {
  const res = await APIService.request("reports", token, {
    method: "POST",
    body: form,
  });

  return res.ok;
}

export async function get(
  token: AccessTokenClassInterface,
): Promise<ReportClassInterface[]> {
  const res = await APIService.request("reports/my", token);

  const { data } = await res.json();

  return data.map(map);
}

export async function getAll(
  token: AccessTokenClassInterface,
): Promise<ReportClassInterface[]> {
  const data: any = await APIService.genericGetRequest(
    token,
    "admin/reports",
    map,
  );
  console.log("data");
  console.log(data);
  return data;
}
