import request from "./api.service";
import { getToken } from "./user.service";

export async function changeBookingSolicitationStatus(
  id: number,
  status: "approve" | "reject" | "cancel",
): Promise<boolean> {
  const token = getToken();

  //check if token is valid, else redirects user to login page

  const res = await request(`reservations/${id}/${status}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.token}`,
    },
    method: "PATCH",
  });

  return res.ok;
}
