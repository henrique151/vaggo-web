import PropertyReviews from "@/classes/property/review/PropertyReviews";
import request from "./api.service";

export default async function getReviewsFromProperty(id: number) {
  const res = await request({
    url: `reviews/properties/${id}`,
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
    return new PropertyReviews(data);
  }
}
