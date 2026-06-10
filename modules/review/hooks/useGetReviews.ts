"use client";

import { Review } from "@classes";
import { ReviewController } from "@controllers";
import { BrowserService } from "@services";
import { useEffect, useState } from "react";

export default function useGetReviews(): [reviews: Review[], loaded: boolean];
export default function useGetReviews(
  type: "property" | "spot",
  id: number,
): [reviews: Review[], loaded: boolean];
export default function useGetReviews(type?: "property" | "spot", id?: number) {
  const [reviews, setReviews] = useState<Review[] | undefined>(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      const res = await ReviewController.get(
        BrowserService.getToken(),
        type,
        id,
      );
      const objs = res.map((review) => {
        return new Review(review);
      });
      setReviews(objs);
    };
    load();
  }, []);

  return [reviews, loaded];
}
