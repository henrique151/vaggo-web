import { authenticate } from "@/controllers/user.controller";
import { setToken } from "@/services/browser.service";
import { redirect } from "next/navigation";
// import { redirect } from "next/navigation";

export default async function action(prevState, form: FormData) {
  const cred = {
    email: form.get("email") as string,
    pass: form.get("password") as string,
  };

  // const timeConsumingPromise = new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve("Time-consuming task completed!");
  //   }, 2000); // 2 seconds delay
  // });

  // await timeConsumingPromise;

  const res = await authenticate(cred.email, cred.pass);

  console.log("from action");
  console.log(res);

  if (res.success) {
    console.log("Seja bem vindo!");
    setToken(res.token);
    console.log(res.token);
    redirect("/user/dashboard");
  }
  return res;
}
