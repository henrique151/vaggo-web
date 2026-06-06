import ControllerError from "./ControllerError";

export default class ControllerStatus {
  public success: boolean;
  public message: string; //possibly more for internal messages or smth, check later if it get unused or not
  private error: ControllerError | undefined; //global message for forms or anything else
  private fields; //field properties and individual error messages

  constructor({
    success,
    message,
    error,
  }: {
    success?: boolean;
    message?: string;
    error: ControllerError;
  }) {
    this.success = success ?? undefined;
    this.message = message ?? undefined;
    if (error) {
      this.success = success ?? false;
      this.error = error;
    }
  }

  public setError(error: ControllerError, successValueOverride?: boolean) {
    this.success = successValueOverride ?? false;
    this.error = error;
  }

  public setFields() {
    
  }
}
