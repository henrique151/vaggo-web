import ControllerError from "./ControllerError";

export default class ControllerStatus {
  public success: boolean;
  public message: string;
  private error: ControllerError | undefined;
  private fields;

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
}
