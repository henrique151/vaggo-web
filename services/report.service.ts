import map from "@/mappers/report.mapper";
import request from "./api.service";
import { Report } from "@/classes/Report";

export async function listMyReports(): Promise<Report[]> {
  const res = await request({
    url: `reports/my`,
    useToken: true,
    req: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  if (res.ok) {
    const data = await res.json();

    return data.data.map(map);
  }
}

export async function sendReport(
  type: "SPOT" | "CHAT",
  targetUserId: number,
  formData: FormData,
) {
  formData.set("reportedUserId", String(targetUserId));
  formData.set("targetType", type);

  const res = await request({
    url: `reports`,
    useToken: true,
    req: {
      method: "POST",
      body: formData,
    },
  });

  if (res.ok) {
    const data = await res.json();
    console.log(data);
    return true;
  } else {
    return false;
  }
}
