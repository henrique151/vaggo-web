/* eslint-disable @typescript-eslint/no-explicit-any */
import { Address } from "@/classes/address/address";
import Property from "@/classes/property";
import { map as mapImages } from "./image.mapper";
import State from "@/classes/address/state";
import { Image } from "@/classes/data/Image";

export function map(d: any) {
  // Normaliza o proprietário da propriedade, independente do formato vindo da API
  console.log("[PropertyService] RAW DATA:", JSON.stringify(d, null, 2));
  if (!d.user) {
    const ownerId = d.userId ?? d.ownerId ?? d.owner?.id ?? d.user?.id;
    if (ownerId !== undefined) {
      d.user = { id: ownerId };
    }
  }
  console.log("[PropertyService] RAW DATA 2222222:", JSON.stringify(d, null, 2));
  return new Property(d);
}