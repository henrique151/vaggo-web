import DatePeriod from "@/classes/data/DatePeriod";
import request from "./api.service";

export async function changeBookingSolicitationStatus(
  id: number,
  status: "approve" | "reject" | "cancel",
): Promise<boolean> {
  //check if token is valid, else redirects user to login page

  const res = await request({
    url: `reservations/${id}/${status}`,
    useToken: true,
    req: {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
    },
  });

  return res.ok;
}

export async function bookSpot({
  id,
  vehicleId,
  datePeriod,
}: {
  id: number;
  vehicleId: number;
  datePeriod: DatePeriod;
}): Promise<boolean> {
  // "spotId": 1,
  //   "vehicleId": 1,
  //   "startDate": "2026-01-01",
  //   "endDate": "2026-12-31"
  const dateString = datePeriod.toString();
  const requestBody: BodyInit = JSON.stringify({
    spotId: id,
    vehicleId: vehicleId,
    startDate: dateString.start,
    endDate: dateString.end,
  });

  const res = await request({
    url: `reservations`,
    useToken: true,
    req: {
      method: "POST",
      body: requestBody,
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  if (res.ok) {
    const data = await res.json();
    console.log("from api.service");
    console.log(data);
    return true;
  }

  return false;
}
