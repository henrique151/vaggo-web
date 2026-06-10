import { Property, Reservation, Spot, User } from "@classes";
import {
  DeepPartial,
  // Property,
  ReviewClassInterface,
  ReviewStructureInterface,
  UserClassInterface,
  UserStructureInterface,
} from "@interfaces";

export class Review implements ReviewClassInterface {
  id: number;
  info: {
    rating: 1 | 2 | 3 | 4 | 5;
    comment: string;
    author: User;
  };
  date: { review: Date };
  property: Property;
  spot: Spot;
  reservation: Reservation;

  constructor(i: ReviewStructureInterface) {
    this.id = i.id;
    this.info = {
      rating: i.info?.rating,
      comment: i.info.comment,
      author: i.info?.author && new User(i.info.author),
    };
    this.date = { review: i.date?.review && new Date(i.date?.review as Date) };
    this.property = i.property && new Property(i.property);
    this.spot = i.spot && new Spot(i.spot);
    this.reservation = i.reservation && new Reservation(i.reservation);
  }
}
