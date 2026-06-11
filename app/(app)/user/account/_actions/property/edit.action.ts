import { PropertyController } from "@controllers";
import { BrowserService } from "@services";

export default async function action(prevState: any, form: FormData) {
  const res = await PropertyController.edit(BrowserService.getToken(), form);
  console.log("res");
  console.log(res);
  // if (res?.success) return true;
  return res;
}
