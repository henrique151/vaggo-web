import Review from "@/classes/Review";
import map from "@/mappers/review.mapper";

export default class PropertyReviews {
  averageRating: number;
  total: number;
  reviews: Review[];

  constructor(data: any) {
    this.averageRating = data.averageRating;
    this.total = data.total;
    this.reviews = data.data.map(map);
  }
}
