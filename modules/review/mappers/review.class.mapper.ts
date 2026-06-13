import { Review } from "@classes";
import { ReviewClassInterface, ReviewStructureInterface } from "@interfaces";

export default function map(d: ReviewClassInterface): Review {
  return new Review(d);
}
