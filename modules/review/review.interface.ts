import {
  PropertyClassInterface,
  SpotClassInterface,
  DeepPartial,
  UserClassInterface,
  ReservationClassInterface,
  UserStructureInterface,
  PropertyStructureInterface,
  SpotStructureInterface,
  ReservationStructureInterface,
} from "@interfaces";

export type ReviewClassInterface = Review;
export type ReviewStructureInterface = DeepPartial<Review>;

interface Review {
  id: number;
  info: {
    rating: 1 | 2 | 3 | 4 | 5;
    comment: string;
    author: UserClassInterface | UserStructureInterface;
  };
  date: {
    review: Date;
  };
  property: PropertyClassInterface | PropertyStructureInterface;
  spot: SpotClassInterface | SpotStructureInterface;
  reservation: ReservationClassInterface | ReservationStructureInterface;
}
