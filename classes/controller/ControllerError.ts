interface ControllerErrorBase {
  message: string;
}

export default class ControllerError implements ControllerErrorBase {
  public message: string;
  constructor(message?) {
    if (message) this.message = message;
  }

  public static fromObject(obj: object) {
    const controller = new ControllerError();
    for (const [key, value] of Object.entries(obj)) {
      controller[key] = value;
    }
    return controller;
  }
}
