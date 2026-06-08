import PropertyReviews from "@/classes/property/review/PropertyReviews";
import request from "./api.service";

export async function getReviewsFromProperty(id: number) {
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

export async function sendReview(
  reservationId: number,
  rating: number,
  comment: string,
): Promise<boolean> {
  const res = await request({
    url: `reviews`,
    useToken: true,
    req: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reservationId: reservationId,
        rating: rating,
        comment: comment,
      }),
    },
  });

  if (res.ok) {
    const data = await res.json();
    console.log("looks like it got sent. check the result below.");
    console.log(data);
    return true;
    // return new PropertyReviews(data);
  }
  {
    return false;
  }
}
