"use server";
import { AccessTokenClassInterface } from "@interfaces";
import * as APIService from "../api/api.service";
import map from "./mappers/review.service.interface.mapper";

export async function get(token: AccessTokenClassInterface): Promise<any>;
export async function get(
  token: AccessTokenClassInterface,
  type: "property" | "spot",
  id: number,
): Promise<any>;
export async function get(
  token: AccessTokenClassInterface,
  type?: "property" | "spot",
  id?: number,
): Promise<any> {
  const urlModifier = type
    ? (type === "property" && `properties/${id}`) ||
      (type === "spot" && `spots/${id}`)
    : "my";
  const url = `reviews/${urlModifier}`;
  console.log(url);
  const res = await APIService.request(url, token);

  const { data } = await res.json();

  return data.map(map);
}
