// import { authenticate } from "@/controllers/user.controller";
import { setToken } from "@/services/browser.service";
import { UserController } from "@controllers";
import { FormUtils } from "@utils";
import { redirect } from "next/navigation";
// import { redirect } from "next/navigation";

export default async function action(prevState, form: FormData) {
  // if (String(form.get("password")) !== String(form.get("passwordConfirm")))
  // return {};
  // const cred = Object.fromEntries(form) as { email: string; password: string };
  if (form.get("passConfirm")) form.delete("passConfirm");

  console.log(FormUtils.toObject(form));

  const res = await UserController.register(form);

  // console.log("from action");
  // console.log(res);

  // if (res.success) {
  //   console.log("Seja bem vindo!");
  //   setToken(res.data);
  //   console.log(res.data);
  //   redirect("/user/dashboard");
  // }
  return res;
}
