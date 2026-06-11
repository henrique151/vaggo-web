"use server";
import * as ReportService from "@/modules/report/report.service";
import { AccessTokenClassInterface, ReportClassInterface } from "@interfaces";

export async function register(
  token: AccessTokenClassInterface,
  type: "SPOT" | "CHAT",
  reportedUserId: number,
  form: FormData,
) {
  form.set("targetType", type);
  form.set("reportedUserId", String(reportedUserId));

  const res = await ReportService.register(token, form);
  return res;
}

export async function get(
  token: AccessTokenClassInterface,
): Promise<ReportClassInterface[]> {
  const res = await ReportService.get(token);

  return res;
}
