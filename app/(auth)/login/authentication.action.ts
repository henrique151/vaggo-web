import { authenticate } from "@/modules/user/user.controller";
import { setToken } from "@/services/browser.service";
import * as BrowserService from "@/modules/browser/browser.service";
import { redirect } from "next/navigation";
import {
  AccessTokenClassInterface,
  AccessTokenStructureInterface,
} from "@/modules/browser/browser.interface";
// import { redirect } from "next/navigation";

export default async function action(prevState, form: FormData) {
  // const cred = {
  //   email: form.get("email") as string,
  //   pass: form.get("password") as string,
  // };
  const cred = Object.fromEntries(form) as { email: string; password: string };
  // console.log(prevState);
  // console.log("Object converted");
  // console.log(values);

  // const timeConsumingPromise = new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve("Time-consuming task completed!");
  //   }, 2000); // 2 seconds delay
  // });

  // await timeConsumingPromise;

  const res = await authenticate(cred.email, cred.password);

  console.log("from action");
  console.log(res);

  if (res.success) {
    const api = res.data;
    console.log("Seja bem vindo!");
    const data: AccessTokenStructureInterface = {
      token: api.accessToken,
      expiration: new Date(api.expiresIn),
      user: { id: api.user.id },
    };
    // setToken(res.data);
    BrowserService.setToken(data);
    console.log(data);
    redirect("/user/dashboard");
  }
  return res;
}
