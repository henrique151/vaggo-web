import { map } from "@/mappers/spot.mapper";
import request from "./api.service";
import { Spot } from "@/classes/spot";

export async function getSpotsByPropertyId(id: number): Promise<Spot[]> {
  const res = await request({
    url: `spots/properties/${id}/spots`,
    useToken: true,
    req: {
      method: "GET",
    },
  });

  if (res.ok) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = (await res.json()) as { data: any[] };
    return data.map(map);
  } else {
    return [];
  }
}
