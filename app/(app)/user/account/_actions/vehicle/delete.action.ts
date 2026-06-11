"use client";
import { VehicleController } from "@controllers";
import { BrowserService } from "@services";

export default async function action(id: number) {
  // console.log("hello!");
  // const id = Number(form.get("id"));
  // form.delete("id");
  // console.log(prevState);
  // console.log(Object.fromEntries(form.entries()));

  const res = await VehicleController.deleteById(BrowserService.getToken(), id);
  console.log("res");
  console.log(res);
  // if (res?.success) return true;
  return res;
}
