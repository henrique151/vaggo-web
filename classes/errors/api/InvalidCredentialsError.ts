export default class InvalidCredentialsError extends Error {
  constructor() {
    super(
      "Invalid Credentials inserted. Check if E-mail or Password are correct and try again.",
    );
    this.name = "InvalidCredetialsError";
    // Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
  }
}
