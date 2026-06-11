"use client";
import { UserController } from "@controllers";
import { BrowserService } from "@services";

export default async function action(prevState, form: FormData) {
  // console.log("hello!");
  // const id = Number(form.get("id"));
  // form.delete("id");
  // console.log(prevState);
  // console.log(Object.fromEntries(form.entries()));

  const res = await UserController.edit(BrowserService.getToken(), form);
  console.log("res");
  console.log(res);
  // if (res?.success) return true;
  return res;
}
