"use server";
import {
  AccessTokenClassInterface,
  ReviewClassInterface as ReviewClassInterface,
} from "@interfaces";
import * as ReviewService from "./review.service";

export async function get(
  token: AccessTokenClassInterface,
): Promise<ReviewClassInterface[]>;
export async function get(
  token: AccessTokenClassInterface,
  type: "property" | "spot",
  id: number,
): Promise<ReviewClassInterface[]>;
export async function get(
  token: AccessTokenClassInterface,
  type?: "property" | "spot",
  id?: number,
): Promise<ReviewClassInterface[]> {
  const res = await ReviewService.get(token, type, id);

  return res;
}
