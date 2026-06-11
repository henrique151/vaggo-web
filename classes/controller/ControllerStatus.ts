import ControllerError from "./ControllerError";
import ControllerFieldStatus from "./ControllerFieldStatus";

export default class ControllerStatus {
  public success: boolean;
  public message: string; //possibly more for internal messages or smth, check later if it get unused or not
  public error: ControllerError | undefined; //global message for forms or anything else
  public fields: Record<string, ControllerFieldStatus> = {}; //field properties and individual error messages
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public data: any;

  constructor({
    success,
    message,
    error,
    // fields,
  }: {
    success?: boolean;
    message?: string;
    error?: ControllerError;
    // fields?: FormData | object
  }) {
    this.success = success ?? undefined;
    this.message = message ?? undefined;
    if (error) {
      this.success = success ?? false;
      this.error = error;
    }
  }

  public failed(reason?: string, allFields?: boolean) {
    this.success = false;
    if (reason) this.error = new ControllerError(reason);

    if (allFields) {
      for (const [key, value] of Object.entries(this.fields)) {
        value.setError();
        // console.log(value);
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public successfull(data?: any) {
    this.success = true;
    this.data = data;
  }

  // public setError(error: ControllerError, successValueOverride?: boolean) {
  public setError(error?: string, successValueOverride?: boolean) {
    const controllerErr = new ControllerError(error);
    this.success = successValueOverride ?? false;
    this.error = controllerErr;
  }

  public setFields(data: FormData | object) {
    this.fields = {};

    const iterator =
      data.constructor == FormData ? data.entries() : Object.entries(data);

    for (const [key, value] of iterator) {
      this.fields[key] = new ControllerFieldStatus(value);
    }
    // switch (data.constructor) {
    //   case FormData:
    //     console.log("hello there! data here is a FormData!");
    //     // for (const [key, value] of data as FormData) {
    //     // this.fields[key] = new ControllerFieldStatus(value)
    //     // }
    //     break;
    //   case Object:
    //     console.log("hello there! data here is a plain object!");

    //     break;
    // }
  }

  public addField(name: string, field: ControllerFieldStatus) {
    this.fields[name] = field;
  }

  public getField(name: string): ControllerFieldStatus | undefined {
    return this.fields[name];
  }

  public updateFieldValues(form: FormData) {}

  public mapObject(obj) {
    const map = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value instanceof Object) {
        //if currObj is ControllerError | ControllerFieldStatus
        map[key] = this.mapObject(value);
      } else {
        map[key] = value;
      }
    }
    return map;
  }

  public toPlainObject() {
    // this.convert();
    return this.mapObject(this);
    // const map = {};
    // for (const [key, value] of Object.entries(this)) {
    //   map[key] = value;
    // }
    // console.log("Object.entries(this)");
    // console.log(Object.entries(this));
    // return {
    //   success: this.success,
    //   message: this.message || undefined,
    //   error: this.error ? { message: this.error.message } : undefined,
    //   fields: undefined,
    // };
  }

  public static setup(fields: FormData | object): ControllerStatus;
  public static setup({
    fields,
  }: {
    fields?: FormData | object;
  }): ControllerStatus {
    const controller = new ControllerStatus({});
    // set all fields
    console.log("fields from ControllerStatus");
    console.log(fields);
    if (fields) controller.setFields(fields);

    return controller;
  }

  public static fromObject(obj: object) {
    const controller = new ControllerStatus({});
    for (const [key, value] of Object.entries(obj)) {
      switch (key) {
        case "fields":
          const fields = Object.entries(value);
          const fieldMap = {};

          for (const [fieldKey, fieldValue] of fields) {
            const fieldController = ControllerFieldStatus.fromObject(
              fieldValue as object,
            );
            fieldMap[fieldKey] = fieldController;
          }

          controller.fields = fieldMap;
          // controller.setFields(fieldMap);
          break;
        default:
          // console.log("defualt key");
          // console.log(key);
          controller[key] = value;
          break;
      }
    }
    // controller.setFields(controller.fields);
    return controller;
  }
}
