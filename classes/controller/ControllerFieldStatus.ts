import ControllerError from "./ControllerError";

export default class ControllerFieldStatus {
  public value: any;
  public error: ControllerError | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(value?: any, error?: ControllerError) {
    this.value = value;
    if (error) this.error = error;
  }

  public setError(message?) {
    this.error = new ControllerError(message);
  }

  public static fromObject(obj: object) {
    const controller = new ControllerFieldStatus();
    for (const [key, value] of Object.entries(obj)) {
      // console.log("from fieldStatus: ", key);
      // console.log("from fieldStatus: ", value);
      switch (key) {
        case "error":
          controller.error = ControllerError.fromObject(value);
          break;
        default:
          controller[key] = value;
          break;
      }
      controller[key] = value;
    }
    return controller;
  }
}
