"use server";
import * as APIService from "@/modules/api/api.service";
import { AccessTokenClassInterface, ReportClassInterface } from "@interfaces";
import map from "./mappers/report.service.interface.mapper";

export async function get(
  token: AccessTokenClassInterface,
): Promise<ReportClassInterface[]> {
  const res = await APIService.request("reports/my", token);

  const { data } = await res.json();

  return data.map(map);
}
