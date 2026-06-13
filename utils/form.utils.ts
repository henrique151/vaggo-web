import { ControllerStatus } from "@classes";
import { FormUtils } from "@utils";

export function toObject(form: FormData): object {
  return Object.fromEntries(form.entries());
}

export function toForm(data: Record<string, string | Blob | number>): FormData {
  const form = new FormData();

  for (const [key, value] of Object.entries(data)) {
    let parsedValue = undefined;

    switch (typeof value) {
      case "number":
        parsedValue = String(value);
        break;
    }

    form.set(key, parsedValue ?? value);
  }

  return form;
}

export function mapZodErrors(controller: ControllerStatus, data: any) {
  for (const issue of data.error.issues) {
    const current = issue.path[0] as string;
    controller.setFieldError(current, issue.message);
  }
}

export function validateForm(
  controller: ControllerStatus,
  schema: any,
  form: FormData,
) {
  const obj = toObject(form);
  const res = schema.safeParse(obj);

  if (!res.success) {
    FormUtils.mapZodErrors(controller, res);
    controller.failed();
  }
}
