import { DeepPartial } from "../types";
import { PropertyClassInterface, SpotClassInterface } from "./property";
import { UserClassInterface } from "./user.interface";

export type ReviewClassInterface = Review;
export type ReviewStructureInterface = DeepPartial<Review>;

interface Review {
  id: number;
  info: {
    rating: 1 | 2 | 3 | 4 | 5;
    comment: string;
    author: UserClassInterface;
  };
  date: {
    review: Date;
  };
  user: UserClassInterface;
  property: PropertyClassInterface;
  spot: SpotClassInterface;
  // reservation: ReservationInterface
}

// export type ReviewStructureInterface = Partial<ReviewClassInterface>;
