"use client";
import { PropertyController } from "@controllers";
import { BrowserService } from "@services";

export default async function action(id: number) {
  const res = await PropertyController.deleteById(
    BrowserService.getToken(),
    id,
  );
  console.log("res");
  console.log(res);
  return res;
}
