"use server";
import * as ReportService from "@/modules/report/report.service";
import { AccessTokenClassInterface, ReportClassInterface } from "@interfaces";

export async function get(
  token: AccessTokenClassInterface,
): Promise<ReportClassInterface[]> {
  const res = await ReportService.get(token);

  return res;
}
