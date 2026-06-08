import APIError from "./APIError";

export default class InvalidCredentialsError extends APIError {
  constructor() {
    super(
      "Invalid Credentials inserted. Check if E-mail or Password are correct and try again.",
    );
    this.name = "InvalidCredetialsError";
    // Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
  }
}
