import {
  ControllerFieldStatusClassInterface,
  ControllerStatusClassInterface,
  ControllerStatusStructureInterface,
} from "@interfaces";
import { FormUtils, ObjectUtils } from "@utils";
import { fi } from "zod/v4/locales";

export class ControllerStatus implements ControllerStatusClassInterface {
  success: boolean;
  message: string;
  pending: boolean;
  error?: ControllerError;
  fields: Record<string, ControllerFieldStatus>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;

  constructor(i: ControllerStatusStructureInterface) {
    const fields = {};
    if (i.fields) {
      for (const [key, value] of Object.entries(i.fields)) {
        fields[key] = new ControllerFieldStatus(value);
      }
    }

    this.success = i.success;
    this.message = i.message;
    this.pending = i.pending;
    this.error = i.error && new ControllerError(i.error);
    this.fields = fields;
    this.data = i.data;
  }

  public getField(name: string): ControllerFieldStatus | undefined {
    return this.fields[name] ?? undefined;
  }

  public addField(name, value) {}

  public failed(
    message?: string,
    params?: { allFields?: boolean; cleanAllFieldErrors?: boolean },
  ) {
    this.error = new ControllerError({ message: message });
    if (params?.allFields) {
      for (const [key, value] of Object.entries(this.fields)) {
        const error = new ControllerError({});
        if (!value.error) value.error = error;
        else {
          if (params.cleanAllFieldErrors) value.error = error;
        }
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public successfull(data?: any, params?: { ok?: boolean }) {
    this.success = true;
    this.pending = false;
    this.error = undefined;
    this.fields = undefined;
    this.data = data;
  }

  public setFields(formOrObj: FormData | object): void {
    // const obj = formOrObj instanceof FormData ? formOrObj.entries() : formOrObj;
    const obj =
      formOrObj instanceof FormData ? FormUtils.toObject(formOrObj) : formOrObj;

    for (const [key, value] of Object.entries(obj)) {
      this.fields[key] = new ControllerFieldStatus({ value: value });
    }
  }

  public setError(message?: string) {
    this.error = new ControllerError({ message: message });
  }

  public setFieldError(name: string, message?: string) {
    const field = this.getField(name);
    if (!field) return undefined;
    field.error = new ControllerError({ message: message });
  }

  public static setup(): ControllerStatus;
  public static setup(form: FormData | object): ControllerStatus;
  public static setup(form?: FormData | object): ControllerStatus {
    const controller = new ControllerStatus({});
    if (form) controller.setFields(form);
    return controller;
  }

  public toObject() {
    return ObjectUtils.toObject(this);
  }
}

type ControllerErrorClassInterface = ControllerStatusClassInterface["error"];
class ControllerError implements ControllerErrorClassInterface {
  message?: string;

  constructor(i: Partial<ControllerErrorClassInterface>) {
    this.message = i.message;
  }
}

class ControllerFieldStatus implements ControllerFieldStatusClassInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  error?: ControllerError;

  constructor(i: Partial<ControllerFieldStatusClassInterface>) {
    this.value = i.value;
    this.error = i.error && new ControllerError(i.error);
  }
}
