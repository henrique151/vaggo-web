import { Spot } from "@/classes/spot";
import { Image } from "@/classes/data/Image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function map(d: any) {
  d.image = new Image(d.imageUrl);

  return new Spot(d);
}
