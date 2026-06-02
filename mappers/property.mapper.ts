/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Image } from "@/classes/data/Image";
import { Address } from "@/classes/address/address";
import Property from "@/classes/property";
import { map as mapImages } from "./image.mapper";
import State from "@/classes/address/state";

export function map(d: any, stateData: any) {
  d.images = d.images.map(mapImages);

  d.address.city.state = State.getFromList(d.address.city.stateId, stateData);
  console.log(d.address.city);

  // d.address.city = new City(d.address.city);

  d.address = new Address(d.address);

  return new Property(d);
}
