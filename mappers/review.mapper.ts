import Review from "@/classes/Review";

export default function map(d: any) {
  return new Review(d);
}
